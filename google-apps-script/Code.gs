function doPost(e) {
  try {
    const data = getFormData_(e);
    const type = (data.type || "waitlist").toString().toLowerCase();

    if (type === "referral_click") {
      logReferralClick_(data);
      return jsonResponse_({ success: true, message: "Referral click saved" });
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

  // Column order must match the sheet headers exactly:
  // Timestamp, Membership Type, Name, Email, Telegram, City, Gender, Age Range,
  // MVP Tester, Wardrobe Size, Main Problem, Instagram, TikTok, TG Access, IP, Ref
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
  const sheet = getOrCreateSheet_("ReferralClicks", [
    "Timestamp",
    "Ref",
    "Path",
    "Page Referrer",
    "User Agent",
  ]);

  const ref = (data.ref || "").toString().trim();
  if (!ref) {
    throw new Error("Missing ref for referral_click");
  }

  sheet.appendRow([
    new Date(),
    ref,
    data.path || "",
    data.pageReferrer || "",
    data.userAgent || "",
  ]);
}

function getWaitlistSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return (
    ss.getSheetByName("Waitlist") ||
    ss.getSheetByName("Sheet1") ||
    ss.getActiveSheet()
  );
}

function ensureWaitlistHeaders_(sheet) {
  const headers = [
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

  // Ensure Ref header exists in column P (16)
  const refHeader = sheet.getRange(1, 16).getValue();
  if (!refHeader) {
    sheet.getRange(1, 16).setValue("Ref");
  }
}

function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

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
    version: 5,
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
