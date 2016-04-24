var selectList = document.getElementById('colorSelect');

var conditions = ['normal', 'protanomaly', 'deuteranomaly', 'tritanomaly', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatomaly', 'achromatopsia'];

var conditionNames = ['no colorblindness', 'low red', 'low green', 'low blue', 'no red', 'no green', 'no blue', 'almost no color', 'no color'];

function populateSelect() {
  for (var i=0; i < conditions.length; i++) {
    var option = document.createElement('option');

    option.setAttribute('value', conditions[i]);
    option.text = conditionNames[i];
    selectList.appendChild(option);
  }
}

function switchStyles() {
  var linkTag = document.getElementsByTagName('link')[0];
  var newStylesheet = this.options[this.selectedIndex].value;

  if (this.options[this.selectedIndex].value === 'normal') {
    linkTag.href = 'styles/css/main.css';
  } else {
    linkTag.href = 'styles/css/colortest/' + newStylesheet + '/' + 'main.css';
  }
}

function addEvent(obj, type, fn) {
  if(obj.attachEvent) {
    obj['e' + type + fn] = fn;
    obj[type + fn] = function() {
      obj['e' + type + fn](window.event);
    };
    obj.attachEvent('on' + type, obj[type+fn]);
  } else {
    obj.addEventListener(type, fn, false);
  }
}

populateSelect();
addEvent(selectList, 'change', switchStyles);
