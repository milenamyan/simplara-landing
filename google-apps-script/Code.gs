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
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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
    data.geoCountry || "",
    data.geoCity || "",
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

  sheet.appendRow([
    new Date(),
    data.ref || "",
    data.path || "",
    data.pageReferrer || "",
    data.userAgent || "",
  ]);
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
    version: 4,
    message: "SIMPLARA waitlist + referral handler is running",
  });
}

function testPost() {
  const result = doPost({
    parameter: {
      membershipType: "founders",
      name: "Test User",
      email: "test@example.com",
      telegram: "@testuser",
      city: "Test City",
      tgChannelAccess: "yes",
      gender: "female",
      ageRange: "25-34",
      mvpTester: "yes",
      wardrobeSize: "51-100",
      mainProblem: "nothing-to-wear",
      instagram: "@testuser",
      tiktok: "@testuser",
      ip: "127.0.0.1",
      geoCountry: "Test Country",
      geoCity: "Test Geo City",
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
