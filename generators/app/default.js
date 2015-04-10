var core = {
    "application": {
        "id": "app",
        "home": "/",
        "blank": "/",
        "notFound": "/",
        "redirectAfterRouteError": "/",
        "defaultSandboxPermissions": "/",
        "defaultSandboxId": "/"
    },
    "culture": {
        "available": [
            "en",
            "fr"
        ],
        "default": "en"
    },
    "env": {
        "type": "test"
    },
    "security": {
        "autoLogin": true,
        "redirectAfterLogout": "/",
        "redirectAfterLogin": "/",
        "persistentRestrictions": false
    },
    "utils": {}
};

var ui = {
    "select": {},
    "grid": {},
    "ui": {
        "expandedRouteCategories": []
    },
    "notifications": {
        "disableNotifications": false,
        "position": "bottom-right",
        "limit": 10,
        "options": {}
    },
    "text": {}
};

var dataviz = {
    "bullet": {},
    "cumulativeline": {},
    "discretebar": {},
    "historicalbar": {},
    "line": {},
    "lineplusbar": {},
    "linewithfocus": {},
    "multibar": {},
    "multibarhorizontal": {},
    "pie": {},
    "scatter": {},
    "stackedarea": {}
};

var touch = {
    "touch": {},
    "virtualkeyboard": {}
};

var psaManufacturing = {
    "menu": {
        "sideMenuWidth": 100,
        "logoUrl": "/",
        "links":  [{label: '', i18n: '', href: '', target: ''}],
        "hideBookmarks": false,
        "hideNotifications": false,
        "hideConnectivity": false,
        "hideCulture": false,
        "hideSecurity": false,
        "profileChooser": true
    }
};

var psaBrandTheme = {
    "menu": {
        "logoUrl": "/",
        "applications": [{'name': 'ISIS', 'href': 'http://...', 'selected': true}],
        "headerLinks": [{label: '', i18n: '', href: '', target: ''}],
        "selectOptionsList": [{'name': 'Clients'}],
        "selectOptionsExecute": "search"
    }
};

var simpleTheme = {
    "menu": {
        "logoUrl": "/",
        "categories": ["", ""],
        "hideViews": false,
        "routes": [],
        "hideConnectivity": false,
        "hideCulture": false,
        "hideSecurity": false
    }
};

module.exports = {
    core: core,
    ui: ui,
    dataviz: dataviz,
    touch: touch,
    psaManufacturing: psaManufacturing,
    psaBrandTheme: psaBrandTheme,
    simpleTheme: simpleTheme
};