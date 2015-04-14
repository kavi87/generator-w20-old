var core = {
    "modules": {
        "application": {
            "id": "",
            "home": "/",
            "blank": "/blank",
            "notFound": "/not-found",
            "redirectAfterRouteError": "/error",
            "defaultSandboxPermissions": "",
            "defaultSandboxId": ""
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
    }
};

var ui = {
    "modules": {
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
    }
};

var dataviz = {
    "modules": {
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
    }
};

var touch = {
    "modules": {
        "touch": {}
    }
};

var extra = {
    "modules": {
        "analytics": {
            "provider": "piwik",
            "virtualPageViews": true,
            "settings": {}
        }
    }
};

var businessTheme = {
    "modules": {
        "main": {
            "sideMenuWidth": 100,
            "logoUrl": "",
            "links":  [{label: '', i18n: '', href: '', target: '', security: ''}],
            "hideConnectivity": false,
            "hideCulture": false,
            "hideSecurity": false,
            "profileChooser": false
        }
    }
};

var simpleTheme = {
    "modules": {
        "menu": {
            "logoUrl": "",
            "categories": [],
            "hideViews": false,
            "routes": [],
            "hideConnectivity": false,
            "hideCulture": false,
            "hideSecurity": false
        }
    }
};

var compatibility = {

};

var psaLegacyTheme = {
    "modules": {
        "menu": {
            "logoUrl": "/",
            "links":  [{label: '', i18n: '', href: '', target: '', security: ''}],
            "hideConnectivity": false,
            "hideCulture": false,
            "hideSecurity": false,
            "sidebar": {
                "cover": false
            }
        }
    }
};

var psaManufacturing = {
    "modules": {
        "menu": {
            "sideMenuWidth": 100,
            "logoUrl": "/",
            "links":  [{label: '', i18n: '', href: '', target: '', security: ''}],
            "hideBookmarks": false,
            "hideNotifications": false,
            "hideConnectivity": false,
            "hideCulture": false,
            "hideSecurity": false,
            "profileChooser": false
        }
    }
};

var psaBrandTheme = {
    "modules": {
        "menu": {
            "logoUrl": "",
            "applications": [{'name': '', 'href': '', 'selected': true}],
            "headerLinks": [{label: '', i18n: '', href: '', target: ''}],
            "selectOptionsList": [],
            "selectOptionsExecute": ""
        }
    }
};

module.exports = {
    core: { path: "bower_components/w20/core/w20-core.w20.json", definition: core },
    ui: { path: "bower_components/w20/ui/w20-ui.w20.json", definition: ui } ,
    dataviz: { path: "bower_components/w20/dataviz/w20-dataviz.w20.json", definition: dataviz },
    touch: {path:  "bower_components/w20/touch/w20-touch.w20.json", definition: touch },
    extra: { path:"bower_components/w20/extra/w20-extra.w20.json", definition: extra },
    'w20-business-theme': { path:"bower_components/w20-business-theme/w20-business-theme.w20.json", definition: businessTheme },
    // todo handle psa specific
    compatibility: { path:"", definition: compatibility },
    'w20-psa-manufacturing-theme': { path:"", definition: psaManufacturing },
    'w20-psa-brand-theme': { path:"", definition: psaBrandTheme },
    'w20-simple-theme': { path:"", definition: simpleTheme }
};