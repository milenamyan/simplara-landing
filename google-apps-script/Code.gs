function doPost(e) {
  try {
    const data = getFormData_(e);
    const type = (data.type || "waitlist").toString().toLowerCase();

    if (type === "referral_click") {
      logReferralClick_(data);
      return jsonResponse_({ success: true, message: "Referral click saved" });
    }

    if (type === "page_view") {
      logPageView_(data);
      return jsonResponse_({ success: true, message: "Page view logged" });
    }

    logWaitlistSignup_(data);
    return jsonResponse_({ success: true, message: "Data saved successfully" });
  } catch (error) {
    return jsonResponse_({ success: false, error: error.toString() });
  }
}

function logWaitlistSignup_(data) {
  const sheet = getWaitlistSheet_();
  ensureWaitlistHeaders_(sheet);

  // A-P: Timestamp … IP, Ref
  sheet.appendRow([
    new Date(),
    data.membershipType || "",
    data.name || "",
    data.email || "",
    data.telegram || "",
    data.city || "",
    data.gender || "",
    data.ageRange || "",
    data.mvpTester || "",
    data.wardrobeSize || "",
    data.mainProblem || "",
    data.instagram || "",
    data.tiktok || "",
    data.tgChannelAccess || "",
    data.ip || "",
    data.ref || "",
  ]);
}

function logReferralClick_(data) {
  const ref = (data.ref || "").toString().trim();
  if (!ref) {
    throw new Error("Missing ref for referral_click");
  }

  // Dedicated clicks sheet
  const clicksSheet = getOrCreateSheet_("ReferralClicks", [
    "Timestamp",
    "Ref",
    "Path",
    "Page Referrer",
    "User Agent",
  ]);

  clicksSheet.appendRow([
    new Date(),
    ref,
    data.path || "",
    data.pageReferrer || "",
    data.userAgent || "",
  ]);

  // Also bump a simple per-ref counter sheet (easy totals)
  bumpReferralCount_(ref);
}

function logPageView_(data) {
  const ref = (data.ref || "").toString().trim();
  if (!ref) {
    throw new Error("Missing ref for page_view");
  }

  // Increment total visits counter
  bumpPageViewCount_(ref);
}

function bumpPageViewCount_(ref) {
  const sheet = getOrCreateSheet_("ReferralTotals", [
    "Ref",
    "Unique Visitors",
    "Total Visits",
    "Last Visit",
  ]);

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    sheet.appendRow([ref, 0, 1, new Date()]);
    return;
  }

  const refs = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < refs.length; i++) {
    if (String(refs[i][0]).toLowerCase() === ref.toLowerCase()) {
      var row = i + 2;
      var current = Number(sheet.getRange(row, 3).getValue()) || 0;
      sheet.getRange(row, 3).setValue(current + 1);
      sheet.getRange(row, 4).setValue(new Date());
      return;
    }
  }

  sheet.appendRow([ref, 0, 1, new Date()]);
}

function bumpReferralCount_(ref) {
  const sheet = getOrCreateSheet_("ReferralTotals", [
    "Ref",
    "Unique Visitors",
    "Total Visits",
    "Last Visit",
  ]);

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    sheet.appendRow([ref, 1, 0, new Date()]);
    return;
  }

  const refs = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < refs.length; i++) {
    if (String(refs[i][0]).toLowerCase() === ref.toLowerCase()) {
      var row = i + 2;
      var current = Number(sheet.getRange(row, 2).getValue()) || 0;
      sheet.getRange(row, 2).setValue(current + 1);
      sheet.getRange(row, 4).setValue(new Date());
      return;
    }
  }

  sheet.appendRow([ref, 1, 0, new Date()]);
}

function getWaitlistSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Prefer the sheet that already has waitlist headers / data
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName();
    if (name === "ReferralClicks" || name === "ReferralTotals") {
      continue;
    }
    var header = String(sheets[i].getRange(1, 1).getValue() || "");
    if (header.toLowerCase().indexOf("timestamp") !== -1) {
      return sheets[i];
    }
  }
  return (
    ss.getSheetByName("Waitlist") ||
    ss.getSheetByName("Sheet1") ||
    ss.getActiveSheet()
  );
}

function ensureWaitlistHeaders_(sheet) {
  var headers = [
    "Timestamp",
    "Membership Type",
    "Name",
    "Email",
    "Telegram",
    "City",
    "Gender",
    "Age Range",
    "MVP Tester",
    "Wardrobe Size",
    "Main Problem",
    "Instagram",
    "TikTok",
    "TG Access",
    "IP",
    "Ref",
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }

  // Force column P header to Ref (replace GeoCountry if present)
  sheet.getRange(1, 16).setValue("Ref");
}

function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function getFormData_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  throw new Error("No POST data received");
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doGet() {
  return jsonResponse_({
    success: true,
    version: 6,
    message: "SIMPLARA waitlist + referral handler is running",
  });
}

function testPost() {
  const result = doPost({
    parameter: {
      type: "waitlist",
      membershipType: "waitlist",
      name: "Test User",
      email: "test@example.com",
      telegram: "@testuser",
      city: "Yerevan",
      tgChannelAccess: "yes",
      gender: "female",
      ageRange: "25-34",
      mvpTester: "MVP Tester",
      wardrobeSize: "51-100",
      mainProblem: "nothing-to-wear",
      instagram: "@testuser",
      tiktok: "@testuser",
      ip: "127.0.0.1",
      ref: "dinul_hakobyann",
    },
  });

  Logger.log(result.getContent());
}

function testReferralClick() {
  const result = doPost({
    parameter: {
      type: "referral_click",
      ref: "_ella__99",
      path: "/",
      pageReferrer: "https://instagram.com",
      userAgent: "AppsScriptTest",
    },
  });

  Logger.log(result.getContent());
}
