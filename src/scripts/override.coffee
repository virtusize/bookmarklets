override = ((override) ->
    $ = null
    override.div = null
    override.styles = '@@include("styles/override.min.css")'
    override.jQueryCDN = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
    override.bootstrapCDN = 'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
    override.snippet = '!function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","addFindByFit","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="4.0.0",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}'
    override.utilIFrameName = "virtusize-util-iframe"
    override.tldRegex = /[^.]*\.([^.]*|..\...|...\...)$/
    override.bidCookieKey = "vs.bid"

    override.envs =
        staging: "staging.virtusize.com"
        develop: "develop.virtusize.com"
        japan: "api.virtusize.jp"
        api: "api.virtusize.com"

    override.languages = [
        'default'
        'en'
        'de'
        'es'
        'fr'
        'it'
        'ja'
        'nl'
        'pt'
        'sv'
    ]

    regions = [
        "default"
        "AT"
        "AU"
        "DE"
        "DK"
        "ES"
        "EU"
        "FI"
        "FR"
        "GB"
        "IT"
        "JP"
        "NL"
        "NO"
        "RU"
        "SE"
        "US"
    ]

    override.init = ->
        override.registerHandlebarsHelpers()

        override.loadScript override.jQueryCDN, ->
            $ = window.jQueryVS = jQuery.noConflict(true)
            window.initTransition($)
            window.initCollapse($)
            override.injectStyle()
            override.injectMarkup()
            override.render()
            override.hide true
            override.initParams()

    override.initParams = ->
        url = override.getUrlParam('vsUrl')
        if url?
            override.envs['custom'] = url
            override.loadIntegrationScript 'custom', false


    override.injectStyle = ->
        style = $('<style id="virtusize-bookmarklet-styles"></style>')
        style.attr 'type', 'text/css'
        style.html override.styles
        style.appendTo $('head')

    override.injectMarkup = ->
        override.div = $('<div id="virtusize-bookmarklet"></div>')
        override.div.appendTo $("body")

    override.show = (fast=false) ->
        navbar = override.div.find('.navbar')
        if fast
            navbar.show()
        else
            navbar.fadeIn()

    override.hide = (fast=false) ->
        navbar = override.div.find('.navbar')
        panels = override.div.find('.panel')
        if fast
            navbar.hide()
            panels.hide()
        else
            navbar.fadeOut()
            panels.fadeOut()

    override.open = ->
        setTimeout ->
            override.show()
        , 200

    override.close = ->
        override.hide()
        setTimeout ->
            override.remove()
            override.removeUtilIframe()
            $('vs-bookmarklet').remove()
        , 300

    override.remove = ->
        override.div.remove()
        override.div = null

    override.showPanel = (panel, fast=false) ->
        panelLink = override.div.find('.navbar [data-toggle="panel"][data-target="' + panel + '"]')
        panelLinks = override.div.find('.navbar [data-toggle="panel"]')
        panels = override.div.find('.panel')
        panel = override.div.find(panel)

        panels.removeClass 'in'
        panel.addClass 'in'

        if fast
            panels.hide()
            panel.show()
        else
            panels.fadeOut()
            panel.fadeIn()

        panelLinks.parent().removeClass 'active'
        panelLink.parent().addClass 'active'

    override.hidePanel = (panel, fast=false) ->
        panelLink = override.div.find('.navbar [data-toggle="panel"][data-target="' + panel + '"]')
        panel = override.div.find(panel)

        panel.removeClass 'in'

        if fast
            panel.hide()
        else
            panel.fadeOut()

        panelLink.parent().removeClass 'active'

    override.togglePanel = (panel) ->
        panel = override.div.find(panel)

        if panel.hasClass 'in'
            override.hidePanel panel
        else
            override.showPanel panel

    override.registerHandlers = ->
        override.div.on 'click', '[data-toggle="panel"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            override.togglePanel target.data('target')

        override.div.on 'click', '.navbar .close', (ev) ->
            ev.preventDefault()
            override.close()

        override.div.on 'click', '#panel-widgets [data-toggle="widget"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            id = target.data('target')
            window[Virtusize].getWidget(id).open()

        override.div.on 'click', '#panel-integrate [data-action="integrate-env"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            env = target.data 'target'
            override.loadIntegrationScript env
            override.div.find('#panel-integrate [data-action="integrate-env"]').removeClass('btn-primary').addClass('btn-default')
            target.addClass 'btn-primary'

        override.div.on 'click', '[data-action="fill-input-field"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            input = target.data 'target'
            value = target.data 'value'
            override.div.find(input).val value

        override.div.on 'click', '#panel-purchase [data-action="reset-bid"]', (ev) ->
            ev.preventDefault()
            override.resetBid()

        override.div.on 'submit', 'form[data-action="add-widget"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            window[Virtusize].addWidget
                productId: target.find('[name="productId"]').val()
                buttonSelector: target.find('[name="buttonSelector"]').val()
                language:target.find('[name="language"]').val()
                productImageUrl:target.find('[name="productImageUrl"]').val()

            window.setTimeout ->
                override.refresh '#panel-integrate'
            , 700

        override.div.on 'submit', 'form[data-action="add-order"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            orderItem =
                productId: target.find('[name="productId"]').val()
                size: target.find('[name="size"]').val()
                sizeAlias: target.find('[name="sizeAlias"]').val()
                imageUrl: target.find('[name="imageUrl"]').val()

            override.purchase orderItem

            window.setTimeout ->
                override.refresh '#panel-orders'
            , 300

        override.div.on 'click', '#panel-tooltip [data-action="open-tooltip"]', (ev) ->
            ev.preventDefault()
            target = override.div.find(ev.target)
            id = target.data('target')
            widget = window[Virtusize].getWidget(id)
            widget.setTooltipEnabled true

            widget.on 'backend-checked-purchase-history', ->
                @setDebugTooltipData()
                @openTooltip()

            widget.checkPurchaseHistory()

        override.div.on 'click', '#panel-tooltip [data-action="toggle-tooltip-style"]', (ev) ->
            ev.preventDefault()
            $('.vs-tooltip').toggleClass('vs-tooltip-light')

        override.div.on 'click', '#panel-tooltip #mobile-widget-buttons .btn', (ev) ->
            ev.preventDefault()
            window[Virtusize].setMobile($(@).data('value'))
            $('#panel-tooltip #mobile-widget-buttons .btn').removeClass 'active'
            $(@).addClass 'active'

    override.render = ->
        override.registerHandlers()

        override.renderNav()
        override.renderPanels()
        override.setIntegrationStatus()

        override.open()

    override.refresh = (backToPanel)->
        override.renderNav()
        override.renderPanels()
        override.setIntegrationStatus()
        override.show true

        if backToPanel? and backToPanel
            override.showPanel(backToPanel, true)

    override.renderNav = ->
        override.div.html global.templates["src/templates/bookmarklet.handlebars"] panelLinks: override.getPanelLinksData()

    override.renderPanels = ->
        override.div.find('#vs-panels').remove()
        panelLinks = override.div.find('.navbar [data-toggle="panel"]')
        panelLinks.parent().removeClass 'active'
        override.div.append global.templates["src/templates/panels.handlebars"](
            panels: override.getPanelData()
        )

        if override.hasIntegrated()
            env = override.detectEnvironment()
            override.div.find('#panel-integrate [data-action="integrate-env"][data-target="' + env + '"]').removeClass('btn-default').addClass('btn-primary')

    override.setStatus = (statuses) ->
        status = override.div.find('.vs-status')
        status.html ''
        status.hide()

        for s in statuses
            status.append $('<span class="label label-' + s.type + '">' + s.label + '</span> ')
        status.fadeIn()

    override.setIntegrationStatus = ->
        if override.hasIntegrated()
            override.setStatus [
                    label: 'integrated'
                    type: 'success'
                ,
                    label: override.detectEnvironment()
                    type: 'default'
            ]
        else
            override.setStatus [label: 'not integrated', type: 'warning']

    override.hasIntegrated = ->
        Virtusize? and typeof Virtusize is 'string' and 'integrationVersion' of window[Virtusize]

    override.detectEnvironment = ->
        m = $('#vs-integration').attr('src').match /https?\:\/\/(.*\.virtusize\.com)/

        for k,v of override.envs
            return k if v == m[1]

        'other'

    override.getPanelData = ->
        panels = integrate:
                     id: 'panel-integrate'
                     title: 'Integrate'
                     askForApiKey: not override.hasIntegrated()
                 ,
                 orders:
                     id: 'panel-orders'
                     title: 'Orders'
                 ,
                 widgets:
                     id: 'panel-widgets'
                     title: 'Widgets'
                 ,
                 debug:
                     id: 'panel-debug'
                     title: 'Debug'
                 ,
                 purchase:
                     id: 'panel-purchase'
                     title: 'Purchase'
                 ,
                 tooltip:
                     id: 'panel-tooltip'
                     title: 'Settings'

        if override.hasIntegrated()
            $.extend panels.debug,
                apiKey: window[Virtusize].apiKey
                bid: window[Virtusize].bid
                snippetVersion: window[Virtusize].snippetVersion
                integrationVersion: window[Virtusize].integrationVersion
                jQueryVersion: jQuery().jquery
                isModernBrowser: "" + window[Virtusize].isModernBrowser
                cookiesDisabled: "" + window[Virtusize].environment.cookiesDisabled
                numberOfWidgets: Object.keys(window[Virtusize].widgets).length
                numberOfOrders: Object.keys(window[Virtusize].orders).length
                location: window.location.href

            $.extend panels.widgets,
                widgets: window[Virtusize].widgets

            $.extend panels.orders,
                orders: window[Virtusize].orders

            $.extend panels.integrate,
                hasWidgets: Object.keys(window[Virtusize].widgets).length > 0
                widgets: window[Virtusize].widgets
                isDemoStore: window[Virtusize].apiKey is '15cc36e1d7dad62b8e11722ce1a245cb6c5e6692'
                ogpImageUrl: override.getOgpImage()

            $.extend panels.purchase,
                bid: window[Virtusize].bid
                widgets: window[Virtusize].widgets
                ogpImageUrl: override.getOgpImage()
                isDemoStore: window[Virtusize].apiKey is '15cc36e1d7dad62b8e11722ce1a245cb6c5e6692'

            $.extend panels.tooltip,
                widgets: window[Virtusize].widgets

        panels

    override.getPanelLinksData = ->
        panelLinks = []

        if override.hasIntegrated()
            if (Object.keys(window[Virtusize].orders).length is 0 and Object.keys(window[Virtusize].widgets).length is 0) or
               (Object.keys(window[Virtusize].widgets).length > 0)
                panelLinks.push
                    id: 'panel-integrate'
                    title: 'Integrate'

            if Object.keys(window[Virtusize].widgets).length > 0
                panelLinks.push
                    id: 'panel-purchase'
                    title: 'Purchase'
                panelLinks.push
                    id: 'panel-widgets'
                    title: 'Widgets'

            if Object.keys(window[Virtusize].orders).length > 0
                panelLinks.push
                    id: 'panel-orders'
                    title: 'Orders'

            panelLinks.push
                id: 'panel-tooltip'
                title: 'Settings'

            panelLinks.push
                id: 'panel-debug'
                title: 'Debug'
        else
            panelLinks.push
                id: 'panel-integrate'
                title: 'Integrate'

        panelLinks

    override.loadScript = (uri, callback) ->
        s = "script"
        firstScript = document.getElementsByTagName(s)[0]
        script = document.createElement(s)
        script.async = true
        script.type = "text/javascript"
        script.src = uri

        # Attach handlers for all browsers
        script.onload = script.onreadystatechange = (ignore, isAbort) ->
            if isAbort or not script.readyState or /loaded|complete/.test(script.readyState)

                # Handle memory leak in IE
                script.onload = script.onreadystatechange = null

                # Remove the script
                script.parentNode.removeChild script if script.parentNode

                # Dereference the script
                script = `undefined`

                # Callback if not abort
                callback() unless isAbort

        firstScript.parentNode.insertBefore script, firstScript
        script


    override.loadIntegrationScript = (env, panel="#panel-integrate") ->
        $('#vs-integration').remove()
        override.removeUtilIframe()

        if override.hasIntegrated()
            override.previousVs = window[Virtusize]
            override.removeButtonEventHandlers override.previousVs
            window[Virtusize] = null
        else
            apiKey = override.div.find('#integrate-apiKey').val()

        console.log 'Integrating with: ' + override.envs[env]

        script = $('<script></script>')
        script.text override.snippet + '(window,document,"script","' + override.envs[env] + '/integration/v4.source.js","vs");'
        $('head').append script

        window[Virtusize].setApiKey(if override.previousVs? then override.previousVs.apiKey else apiKey)
        if override.previousVs?
            override.addAllWidgets override.previousVs

        # Has to wait for the integration to initialize with the util iframe
        # and everything else, so vs.ready is not enough
        window.setTimeout ->
            override.refresh panel
        , 1000

    override.removeUtilIframe = ->
        $("iframe[name=\"virtusize-util-iframe\"]").remove()

    override.removeButtonEventHandlers = (vs) ->
        for productId, widget of vs.widgets
            widget.buttons.unbind "click.virtusize"
            widget.buttons.hide()

    override.addAllWidgets = (vs) ->
        for productId, widget of vs.widgets
            window[Virtusize].addWidget override.widgetToObject(widget)

    override.widgetToObject = (widget) ->
        productId: widget.getProductId()
        productImageUrl: widget.getProductImageUrl()
        buttonSelector: widget.getButtonSelector()
        productVersion: widget.getProductVersion()
        region: widget.getRegion()
        language: widget.getLanguage()
        availableSizes: widget.getAvailableSizes()
        sizeAliases: widget.getSizeAliases()

    override.purchase = (orderItem) ->
        window[Virtusize].addOrder
            orderId: new Date().getTime()
            userId: window[Virtusize].bid
            items: [orderItem]

    override.resetBid = ->
        override.removeBid()
        iframe = $('iframe[name="' + override.utilIFrameName + '"]')
        host = iframe.attr('src').match(/(^.*)\/integration\/v3/)[1]
        utilIFrame = iframe[0].contentWindow
        ev =
            url: '/integration/v3/destroy-session-hash?apiKey=' + window[Virtusize].apiKey
            type: 'POST'
            name: 'integration-reset-bid'

        utilIFrame.postMessage JSON.stringify(ev), host

        window.setTimeout ->
            override.loadIntegrationScript override.detectEnvironment(), '#panel-purchase'
        , 500

    override.writeCookie = (key, value, options) ->
        if value? and not $.isFunction(value)
            options = $.extend(
                expires: 1
                path: "/"
            , options)

            if typeof options.expires is "number"
                days = options.expires
                t = options.expires = new Date()
                t.setDate t.getDate() + days

            # use expires attribute, max-age is not supported by IE
            return (document.cookie = [
                encodeURIComponent(key)
                "="
                String(value)
                (if options.expires then "; expires=" + options.expires.toUTCString() else "")
                (if options.path then "; path=" + options.path else "")
                (if options.domain then "; domain=" + options.domain else "")
                (if options.secure then "; secure" else "")
            ].join(""))

        null

    override.readCookie = (key) ->

        # To prevent the for loop in the first place assign an empty array
        # in case there are no cookies at all. Also prevents odd result when
        # calling $.cookie().
        cookies = (if document.cookie then document.cookie.split("; ") else [])

        for cookie in cookies
            parts = cookie.split("=")
            name = decodeURIComponent(parts.shift())
            return parts.join("=") if key? and key is name

        null

    override.removeCookie = (key, options) ->
        return false if override.readCookie key is null

        # Must not alter options, thus extending a fresh object...
        override.writeCookie key, "", $.extend({}, options, expires: -1)
        not override.readCookie key

    override.removeBid = ->
        override.removeCookie override.bidCookieKey,
            domain: override.tld(window.location.hostname)
        override.removeCookie override.bidCookieKey,
            domain: '.virtusize.com'

    ###
    Identifies the current top level domain by a regex. This regex is only
    considering the amount of characters in the domain and will not work
    properly for domains shorter than 3 characters.

    The regex is from https://github.com/rails/rails/blob/master/actionpack/lib/action_dispatch/middleware/cookies.rb

    This regular expression is used to split the levels of a domain.
    The top level domain can be any string without a period or
    .**, ***.** style TLDs like co.uk or com.au

    www.example.co.uk gives:
    $& => example.co.uk

    example.com gives:
    $& => example.com

    lots.of.subdomains.example.local gives:
    $& => example.local
    ###
    override.tld = (hostname) ->
        match = hostname.match(override.tldRegex)
        (if match then "." + match[0] else hostname)

    override.getOgpImage = ->
        data = ogp.parse()
        if 'image' of data
            image = data.image
        else if 'image_url' of data
            image = data.image_url

        if $.isArray(image) then image[0] else image


    override.registerHandlebarsHelpers = ->
        Handlebars.registerHelper 'language_select_box', () ->

            str = '<select name="language" class="form-control">'

            for lang in override.languages
                str += '<option value="' + lang + '"' + (if @? and @language is lang then ' selected' else '') + '>' + lang + '</option>'

            str += '</select>'

            new Handlebars.SafeString str


        Handlebars.registerHelper 'mobileButtonClass', () ->
            if @mobile then ' active' else ''

        Handlebars.registerHelper 'desktopButtonClass', () ->
            unless @mobile then ' active' else ''


    override.getUrlParam = (name) ->
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
        regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
        results = regex.exec(location.search)

        if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else null


    override
)(override or {})
