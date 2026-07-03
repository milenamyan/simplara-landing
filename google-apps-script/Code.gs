function doPost(e) {
  try {
    const data = getFormData_(e);
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
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getFormData_(e) {
  if (e && e.parameter && e.parameter.name !== undefined) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  throw new Error("No POST data received");
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      version: 3,
      message: "SIMPLARA waitlist handler is running",
    })
  ).setMimeType(ContentService.MimeType.JSON);
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
    },
  });

  Logger.log(result.getContent());
}
