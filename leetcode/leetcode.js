// =============================
// 查找最大回文
var longestPalindrome = function(s) {
  if (s.length < 1) {
    return s;
  }
  var arr = s.split('');
  var res = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    var char = arr[i];
    var index = [];
    for (var j = i + 1; j < l; j++) {
      if (char === arr[j]) {
        index.push(j);
      }
    }
    for (var j = 0; j < index.length; j++) {
      var start = i,
        end = index[j];
      while (arr[start] === arr[end]) {
        start++;
        end--;
        if (start >= end) {
          res.push(s.slice(i, index[j] + 1));
          break;
        }
      }
    }
  }
  var maxLen = 0;
  var maxStr = arr[0];
  console.log(res);
  for (var i = 0, l = res.length; i < l; i++) {
    if (res[i].length > maxLen) {
      maxLen = res[i].length;
      maxStr = res[i];
    }
  }
  return maxStr;
};
longestPalindrome('babadada');
// ============================
var lengthOfLongestSubstring = function(s) {
  var max = 0;
  var index = 0;
  var arr = [];
  var len = s.length;
  while (1) {
    if (max >= len - index) {
      console.log(max);
      return;
    }
    var i = index;
    while (true) {
      var char = s.charAt(i);
      if (char && !arr.includes(char)) {
        arr.push(char);
        i++;
        continue;
      } else {
        max = max > arr.length ? max : arr.length;
        arr = [];
        index++;
        break;
      }
    }
  }
};
// lengthOfLongestSubstring(" ")
