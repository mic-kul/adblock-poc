function replaceAds(target) {
  console.info("@@@ REPLACE ADS @@@");
  let scripts = target.getElementsByTagName('script');
  for(let script of scripts) {
    console.info(script.innerHTML.match(/.*google\_ad\_width.*/));
  }

  let inses = target.getElementsByTagName('ins');
  for(let ins of inses) {
    if (ins.hasAttribute('data-ad-format')) {
      ins.innerHTML = '<div class="netguru-ad" style="text-align: center; width: 100%; min-width: 35px; min-height: 55px; border: 1px solid red;">Netguru Ads</div>' + ins.innerHTML;
    }
  }
}

replaceAds(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceAds(newNode);
      }
    }
  });
});


observer.observe(document.body, {
  childList: true,
  subtree: true
});
