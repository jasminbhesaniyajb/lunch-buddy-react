var RenderUserStatus = (pUserStatus) =>
{
  switch(pUserStatus) {
    case 0:
      return 'Verification Pending';
    case 1:
      return 'Approval Pending';
    case 2:
      return 'Approved';
    case 2:
      return 'Re-Verification Pending';
    default:
      return '';
  }
}

exports.RenderUserStatus = RenderUserStatus;

var GenerateRandomString = (stringLength) => {
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", retVal = "";
  for (var i = 0, n = charset.length; i < stringLength; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

exports.GenerateRandomString = GenerateRandomString;

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

exports.financial = financial;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateFormate = (item) => {
  const date = new Date(item);
  const month = months[date.getMonth()];
  let dt = date.getDate();
  const year = date.getFullYear();
  if (dt < 10) {
    dt = "0" + dt;
  }
  return `${dt} ${month} ${year}`;
};

exports.dateFormate = dateFormate;