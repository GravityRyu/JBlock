/*
 * JD iOS basicConfig cleaner for Loon.
 * Source endpoint observed in capture:
 * https://api.m.jd.com/client.action?functionId=basicConfig
 */

const rawBody = $response.body || "";

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function setIfExists(root, path, value) {
  const keys = path.split(".");
  let node = root;
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (!isObject(node) || !(keys[i] in node)) return false;
    node = node[keys[i]];
  }
  const last = keys[keys.length - 1];
  if (!isObject(node) || !(last in node)) return false;
  node[last] = value;
  return true;
}

function cleanBasicConfig(body) {
  const data = body && body.data;
  if (!isObject(data)) return body;

  const search = data.JDSearch;
  if (isObject(search)) {
    if (isObject(search.searchListHeader)) {
      Object.keys(search.searchListHeader).forEach((key) => {
        search.searchListHeader[key] = "0";
      });
    }

    setIfExists(search, "forbidSlidePop.forbidSlidePop", "1");
    setIfExists(search, "search936AdShopPopShopExpoSwitcher.search936AdShopPopShopExpoSwitcher", "0");
    setIfExists(search, "switchSearchRequestAdNetWord15220.switchSearchRequestAdNetWord15220", "0");
    setIfExists(search, "switchSearchLoadWithBundleIdAiPop15260.switchSearchLoadWithBundleIdAiPop15260", "0");
    setIfExists(search, "promotionModuleSwitch.promotionModuleSwitch", "0");
    setIfExists(search, "searchADMtaRequestQueueAB.searchADMtaRequestQueueAB", "0");
    setIfExists(search, "hotSearchListSwitcher.newHotSearchList", "0");
    setIfExists(search, "switchEnableRightsPopupFloorRefresh15800.switchEnableRightsPopupFloorRefresh15800", "0");
    setIfExists(search, "switchTipRequestTime.switchTipRequestTime", "0");
    setIfExists(search, "enableListRightBottomSetupOpt15520.enableListRightBottomSetupOpt15520", "0");
    setIfExists(search, "enableSearchBarSetupOpt15320.enableSearchBarSetupOpt15320", "0");
    setIfExists(search, "searchSortBarAB.searchSortBarAB", "0");
    setIfExists(search, "shoppingGuideType.shoppingGuideType", "0");
    setIfExists(search, "shopSearchSwitcher.newShopSearch", "0");
    setIfExists(search, "switchSearchPreDownloadTnCardInfo.search_shop_live_card", {});
    setIfExists(search, "switchSearchPreDownloadTnCardInfo.search_shop_normal_card", {});
    setIfExists(search, "switchSearchPreDownloadTnCardInfo.search_standard_full_screen_30", {});

    if (isObject(search.searchListWarmUpTnConfig15330)) {
      search.searchListWarmUpTnConfig15330.enabled = "0";
      search.searchListWarmUpTnConfig15330.preloadTemplates = [];
      search.searchListWarmUpTnConfig15330.templateConf = {};
      search.searchListWarmUpTnConfig15330.listItemEnabled = "0";
      search.searchListWarmUpTnConfig15330.gridItemEnabled = "0";
    }

    if (isObject(search.searchListWarmUpLegoConf15700)) {
      search.searchListWarmUpLegoConf15700.enabled = "0";
      search.searchListWarmUpLegoConf15700.icons = [];
    }
  }

  setIfExists(data, "JDAdsCore.adDegradationConfig.degraded", "1");
  setIfExists(data, "JDPromotion.promotionH5Config.enOpen", "0");
  setIfExists(data, "JDPromotion.promotionH5Config.enUrl", "");
  setIfExists(data, "JDApp-home.mp-close-ad-pre-req.mp-close-ad-pre-req", "1");

  const xview = data.JDXView;
  if (isObject(xview)) {
    [
      "XVOpenFileThreadSW",
      "XVOpenMtaKDThreadSW",
      "XVOpenTTTUpgrade",
      "15310-preDownload",
      "XVOpenFlexCubeFont",
      "XVOpenHookFilterSW",
      "15110-enFreeMethods",
    ].forEach((key) => {
      if (isObject(xview[key])) {
        if ("value" in xview[key]) xview[key].value = false;
        if ("switch" in xview[key]) xview[key].switch = false;
      }
    });

    setIfExists(xview, "XVCloseTTTUpgrade.value", "true");
    setIfExists(xview, "TejiaTabTip.config.disable", true);
    setIfExists(xview, "TejiaTabTip.config.removeCountDown", 0);
    setIfExists(xview, "TejiaTabTip.config.imageUrl", "");
  }

  const recommend = data.JDUniformRecommend;
  if (isObject(recommend)) {
    setIfExists(recommend, "uniformRecommendAccurateADExpo.uniformRecommendAccurateADExpo", "0");
    setIfExists(recommend, "uniformRecommendADExpoQueue.uniformRecommendADExpoQueue", "0");
  }

  const cart = data.JDCart;
  if (isObject(cart)) {
    setIfExists(cart, "PopCartBottomSpace.Degrade", "1");
    setIfExists(cart, "HandleCouponInterfaceDegrade.isHandleCouponInterfaceDegrade", "1");
    if (isObject(cart.popCartVCNames)) {
      cart.popCartVCNames.navigationBarHiddenVCStrArr = [];
    }
  }

  return body;
}

try {
  const body = cleanBasicConfig(JSON.parse(rawBody));
  $done({ body: JSON.stringify(body) });
} catch (error) {
  $done({ body: rawBody });
}
