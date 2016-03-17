angular
.module(
    'pizza-app.constants',
    []
)
.constant('DEFAULT_LANDING_PAGE', 'daily.list')
.constant('API_HOST', window.api.host)
.constant('API_PATH', window.api.path)
.constant('LANG_FILE', window.langFile)
.constant('API_URL', 'https://' + [window.api.host, window.api.path].join('/'))
.constant('DEFAULT_DATE_FORMAT', 'YYYY-MM-DDTHH:mm:ssZ')
.constant('DEFAULT_DATE_DISPLAY', 'M/D/YYYY')
.constant('DEFAULT_PHONE_FORMAT', new RegExp(/\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/i))
.constant(
    'CC_PATTERN',
    new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)
)
.constant(
    'EMAIL_PATTERN',
    new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
);
