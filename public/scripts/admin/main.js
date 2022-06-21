let activeTab = null;

const setActiveTab = (tab) => {
  const selectedTab = document.getElementById(tab);
  selectedTab.classList.add("nav-link__active");
  const imageFIlename = selectedTab.children.item(0).src;
  const imageFIlenameArray = imageFIlename.split("-");
  imageFIlenameArray[imageFIlenameArray.length - 1] = "filled";

  renamedFile = imageFIlenameArray.join("-") + ".png";
  selectedTab.children.item(0).src = renamedFile;
};
