function hideSubMenus() {
  const asideMenu = document.getElementsByClassName('sphinxsidebarwrapper')[0];
  const levels = getLevel(asideMenu.getElementsByTagName('ul'));
  const levelsQuantity = Math.max(...levels);
  let levelsLists = [];

  for (let i = 1; i <= levelsQuantity; i++) {
    const level = asideMenu.getElementsByClassName('toctree-l' + i);
    levelsLists.push(level);
  }

  levelsLists.forEach((levelList, index) => makeAccordion(levelList, index, levelsQuantity));
}

function makeAccordion(list, index, levelsQuantity) {
  const toctreeList = removeEmptyNodes([...list].map((treeItem, subIndex) => findElement(treeItem, 'ul', index, subIndex)));
  const links = removeEmptyNodes([...list].map((treeItem, subIndex) => findElement(treeItem, 'a', index, subIndex)));

  toctreeList.forEach((node, subIndex) => hideLists(node, index, subIndex));
  listenClick(links, levelsQuantity);
}

function hideLists(items, index, subIndex) {
  items.forEach(item => {
    item.id = `${index}${subIndex}`;
    let currentState = localStorage.getItem(item.id) || '';
    if (!currentState) {
      item.classList.add('hidden');
    }
  });
}

function findLevel(element) {
  return element.parentElement.classList.value.replace('toctree-l', '').split(' ')[0];
}

function getLevel(lists) {
  const croppedClasses = [...lists].map(treeItem => +findLevel(treeItem));
  return croppedClasses.filter(level => !!level);
}

function listenClick(links, levelsQuantity) {
  links.forEach(link => link[0].addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    toggleList(event, levelsQuantity)
  }))
}

function toggleList(event, levelsQuantity) {
  const currentElem = event.target;
  const nextSibling = currentElem.nextElementSibling;
  const isList = nextSibling && nextSibling.localName === 'ul';
  const isLink = currentElem && currentElem.localName === 'a';

  if (isList) {
    if (nextSibling.classList.contains('hidden')) {
      nextSibling.classList.remove('hidden');
      localStorage.setItem(nextSibling.id, 'true');
    } else {
      const nestedLevel = (nextSibling.id + '').slice(0, 1);
      const nestedElementLevels = levelsQuantity - 1 - nestedLevel;

      if (nestedElementLevels > 1) {
        const nested = nextSibling.getElementsByTagName('ul');
        [...nested].forEach(nestedItem => {
          hideItem(nestedItem)
        });
      }
      hideItem(nextSibling)
    }
  } else if (isLink) {
    window.location.href = currentElem.href;
  }
}

function findElement(array, elementName) {
  return [...array.childNodes].filter(item => item['localName'] === elementName)
}

function removeEmptyNodes(nodes) {
  return nodes.filter(item => item.length);
}

function hideItem(item) {
  item.classList.add('hidden');
  localStorage.removeItem(item.id);
}

setTimeout(() => hideSubMenus(), 500);
