// function normalizeMess(content) {
//   const [, ...data] = content.trim().split('\n');
//   return data;
// }

// const getSumComp = (str) => {
//   const art = str.split(';').slice(2, 4);
//   return parseFloat(art[0], 10) + parseFloat(art[1], 10);
// };

// function getSumAvgRating(sum) {
//   const getSumAvg = sum.map((summa) => getSumComp(summa));
//   const indAns = getSumAvg.indexOf(Math.max(...getSumAvg));
//   return sum[indAns].split(';')[0];
// }

// function getSumAvgRating1(sum) {
//   const getSumAvg1 = sum.map((summa) => getSumComp(summa));
//   const indAns1 = getSumAvg1.indexOf(Math.max(...getSumAvg1));
//   return sum[indAns1].split(';')[1];
// }

// const getLoad = (str) => parseInt(str.split(';').at(6), 10);

// const getDownload = (data) => {
//   const download = data.map((data) => getLoad(data));
//   return [Math.max(...download), Math.min(...download)];
// };

// task 1
// const tableParsing = (content) => {
//   const sum = normalizeMess(content);
//   const avg = getSumAvgRating(sum);
//   const avg1 = getSumAvgRating1(sum);
//   console.log(`General top messenger: ${avg}, Owner: ${avg1}`);
//   const [MxDown, MnDown] = getDownload(sum);
//   console.log(`Download count: Max count: ${MxDown}, Min count: ${MnDown}`);
// };

// task 1 Var Ludmili

function convertToObject(content) {
  const [keys, ...apps] = content.trim().split('\n');
  const keysList = keys.split(';').map((key) => (key.startsWith('downloads') ? key.split('_').at(-1) : key.split('_')[0]));
  const appsList = apps.reduce((acc, messenger) => {
    const data = messenger.split(';');
    acc.push(data.reduce((acc2, value, i) => {
      acc2[keysList[i]] = parseFloat(value, 10) || value;
      return acc2;
    }, {}));
    return acc;
  }, []);
  return appsList;
}

const getTopMessenger = (data) => data.reduce((
  top,
  {
    name, developer, playmarket, appstore,
  },
) => (top.at(-1) < playmarket + appstore ? [name, developer, playmarket + appstore] : top), ['', '', 0]);

const getMaxInIndia = (data) => data.reduce((mx, { India }) => Math.max(mx, India), 0);

const getMinInIndia = (data) => data.reduce((mn, { India }) => Math.min(mn, India), Infinity);

const compare = (a, b) => {
  if (a[0] > b[0]) {
    return -1;
  } if (a[0] === b[0]) {
    return 0;
  }
  return 1;
};

const getAustralia = (data) => {
  const temp = data.map(({ name, Australia }) => [Australia, name]).sort(compare);
  return temp.slice(0, 3).map(([, name]) => name).sort();
};

const getAvgTop = (data) => {
  const temp = data.map(({
    name, Russia, Australia, India, England,
  }) => [Russia + Australia + India + England, name]).sort(compare).reverse();
  return temp.map(([, name]) => name);
};

const compareTask5 = (a, b) => (a[1] > b[1] ? -1 : a[b[1] === 1 ? 0 : 1]);

const getDeveloper = (data) => {
  const temp = data.map(({ developer }) => developer);
  const obj = temp.reduce((objDev, dev) => {
    objDev[dev] = (objDev[dev] || 0) + 1;
    return objDev;
  }, {});
  return Object.entries(obj).sort(compareTask5).at(0);
};

const tableParsing = (content) => {
  const data = convertToObject(content);
  const [name, developer] = getTopMessenger(data);
  console.log(`General top messenger: ${name}, Owner: ${developer}`);
  const [mxInd, mnInd] = [getMaxInIndia(data), getMinInIndia(data)];
  console.log(`Download count: Max count: ${mxInd}, Min count: ${mnInd}`);
  const getTopAustralia = getAustralia(data);
  console.log(`Top-3 Australia: ${getTopAustralia.join(', ')}`);
  const getAvgg = getAvgTop(data);
  console.log(`Top downloads: ${getAvgg.join(', ')}`);
  const [name1] = getDeveloper(data);
  console.log(`Top owner: ${name1}`);
};

// task  2 zd 1
function getName(content) {
  const [name] = content.trim().split('\n');
  return name;
}

function getSurname(content) {
  const [, surName] = content.trim().split('\n');
  return surName;
}

// task 2 zd 2
const words = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];

function getStack(content) {
  const [,,,,, stack,,] = content.trim().split('\n');

  function getListOfStack(data) {
    const listOfStack = data.toLowerCase().split(',');
    return listOfStack;
  }

  return getListOfStack(stack);
}

function getStackList(data) {
  const count = data.reduce((acc, stackItem) => {
    const matches = words.filter((word) => stackItem.includes(word.toLowerCase())).length;
    return acc + matches;
  }, 0);

  return count;
}

// task 3 zd 2
function isGitName(names) {
  const [,,,, name,,,] = names.trim().split('\n');
  return name.split(' github.com/')[1];
}

// task 4 zd 2

function isExperiencePers(time) {
  const [,,,,,, exper] = time.trim().split('\n');
  const one = exper.split(',');
  const result = one.map((item) => item.split('-')).slice(1);
  const result1 = result.map((arr) => {
    arr[1] = arr[1].split(';')[0];
    return arr;
  });
  const formatted = result1.map((date) => date.map((datess) => {
    const [day, month, year] = datess.trim().split('.');
    return `${month}.${year}`;
  }));
  return formatted;
}

// task 5 zd 2

function sortedAcademy(academ) {
  const [,,,,,,, academy] = academ.trim().split('\n');
  const sort = academy.slice(11).split(';');
  const sort1 = sort.map((item) => item.split(','));
  const sort2 = sort1.map((item) => item[0].trim().toLowerCase());
  const sorted = sort2.sort((a, b) => a.localeCompare(b));
  return sorted.map((item) => {
    const originalCase = sort1.find((el) => el[0].trim().toLowerCase() === item);
    return originalCase[0].trim();
  });
}

// task 2
const candidateAssessment = (content) => {
  const name = getName(content);
  const surNames = getSurname(content);
  console.log(`Job seeker: ${name}, ${surNames}`);

  const staks = getStack(content);
  const finalochka = getStackList(staks);
  console.log(`Required stack: ${finalochka}`);

  const isName = isGitName(content);
  console.log(`GitHub nickname: ${isName.split(',')[0]}`);

  const getExperience = isExperiencePers(content);
  console.log(getExperience);

  const sortAc = sortedAcademy(content);
  console.log(`Education: ${sortAc.join(', ')}`);
};

// task 1 zd 3

function getNominations(str) {
  const [...nomin] = str.trim().split('\n');
  const firstWords = nomin.map((str) => str.split(' ')[0]);
  const count = firstWords.filter((word) => word === 'Награда').length;
  return count;
}

function getRewards(str) {
  const [...nomin] = str.trim().split('\n');
  const firstWords = nomin.map((str) => str.split(' ')[0]);
  const count = firstWords.filter((word) => word === 'Номинация').length;
  return count;
}

// task 2 zd 3
function nominations2003(movie) {
  const [...years] = movie.trim().split('\n');
  const year2003 = years.map((str) => (str.includes('2003') ? str.split('—')[4] : 0));
  const deleteZero = year2003.filter((item) => item !== 0 && item !== '0');
  const deleteRep = new Set(deleteZero);
  return Array.from(deleteRep);
}

// task 3 zd 3
function percentageOfAwards(rew) {
  const str = rew.trim().split('\n').length;
  return str;
}

// task 4 zd 3
function mostSuccessfulMovie(movie) {
  const [...mov] = movie.trim().split('\n');
  const lastMov = mov.map((str) => str.split('—')[4]);
  const wordCount = lastMov.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const mostRepeat = Object.keys(wordCount).reduce((a, b) => (wordCount[a] > wordCount[b] ? a : b));
  return mostRepeat;
}

// task 3
const actorRating = (content) => {
  const nominationsOrRewards = getNominations(content);
  const rewardsOrNominations = getRewards(content);
  console.log(`Awards: Rewards: ${nominationsOrRewards}, Nominations: ${rewardsOrNominations}`);

  const moviesTop2003 = nominations2003(content);
  console.log(`Movies 2003:${moviesTop2003}`);

  const precent = percentageOfAwards(content);
  console.log(`Rewards percent: ${Math.floor((nominationsOrRewards / precent) * 100)}%`);

  const topMovie = mostSuccessfulMovie(content);
  console.log(`Most successful movie:${topMovie}`);
};

export { tableParsing, candidateAssessment, actorRating };
// parth
