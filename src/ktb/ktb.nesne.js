/* eslint-disable */function propertyExist(object, path) {
  var members = path.split(".");
  var currentMember = object;
  for (var i = 0; i < members.length; i++) {
    if (currentMember.hasOwnProperty(members[i])) {
      currentMember = currentMember[members[i]];
    } else {
      return false;
    }
  }
  return true;
}

function getProperty(object, path) {
  var members = path.split(".");
  var currentMember = object;
  let netice = null;
  for (var i = 0; i < members.length; i++) {
    if (currentMember.hasOwnProperty(members[i])) {
      netice = currentMember[members[i]];
      currentMember = currentMember[members[i]];
    } else {
      return netice;
    }
  }
  return netice;
}

function klonla(object) {
  return Object.assign({}, object);
}

function jsonEsitMi(object1, object2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}

function esitMi(object1, object2) {
  return _.isEqual(object1, object2);
}

module.exports = {
  propertyExist,
  getProperty,
  klonla,
  jsonEsitMi,
  esitMi,
};
