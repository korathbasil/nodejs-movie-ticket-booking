let activeTab = null;

const setActiveTab = (tab) => {
  const selectedTab = document.getElementById(tab);
  selectedTab.classList.add("nav-link__active");
  const imageFilename = selectedTab.children.item(0).src;
  const imageFilenameArray = imageFilename.split("-");
  imageFilenameArray[imageFilenameArray.length - 1] = "filled";

  renamedFile = imageFilenameArray.join("-") + ".png";
  selectedTab.children.item(0).src = renamedFile;
};
