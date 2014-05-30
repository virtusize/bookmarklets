override = ((override) ->
    $ = null
    override.div = null
    override.styles = '@@include("styles/override.min.css")'
    override.jQueryCDN = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'
    override.bootstrapCDN = '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'
    override.snippet = '!function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}'



    envs = 
        staging: "staging.virtusize.com"
        development: "localhost:5000"
        demo: "demo.virtusize.com"
        dev: "dev.virtusize.com"
        translations: "translations.virtusize.com"
        production: "api.virtusize.com"
    
    languages = [
        "default"
        "da"
        "de"
        "en"
        "es"
        "fi"
        "fr"
        "id"
        "it"
        "ja"
        "ko"
        "ms"
        "no"
        "pl"
        "pt"
        "sv"
        "th"
        "vi"
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
    users = [
        "store-user-amalia"
        "store-user-anders"
        "store-user-andreas"
        "store-user-andrej"
        "store-user-bjorn"
        "store-user-erik"
        "store-user-fanny"
        "store-user-faustine"
        "store-user-gustaf"
        "store-user-hannes"
        "store-user-hayato"
        "store-user-helene"
        "store-user-igor"
        "store-user-jevgenij"
        "store-user-krisse"
        "store-user-nuhad"
        "store-user-peder"
        "store-user-per"
        "store-user-robert"
        "store-user-sabina"
        "store-user-yingyu"
        "store-user-test01"
        "store-user-test02"
        "store-user-test03"
        "store-user-test04"
        "store-user-test05"
    ]

    override.init = ->
        console.log 'hi'
        override.loadScript override.jQueryCDN, ->
            $ = window.jQueryVS = jQuery.noConflict(true)

            override.injectStyle()
            override.injectMarkup()
            override.render()

    override.injectStyle = ->
        style = $('<style></style>')
        style.attr 'type', 'text/css'
        style.text override.styles
        style.appendTo $('head')

    override.injectMarkup = ->
        override.div = $('<div id="virtusize-bookmarklet"></div>')
        override.div.appendTo $("body")

    override.show = ->
        override.div.find('.navbar').addClass 'in'

    override.hide = ->
        override.div.find('.navbar').removeClass 'in'

    override.open = ->
        setTimeout ->
            override.show()
        , 300
        
    override.close = ->
        override.hide()
        setTimeout ->
            override.remove()
        , 300

    override.remove = ->
        override.div.remove()
        override.div = null

    override.registerHandlers = ->
        override.div.on 'click', '[data-toggle="panel"]', (ev) ->
            panels = $('.panel')
            panelLinks = $('.navbar [data-toggle="panel"]')
            ev.preventDefault()
            target = $(ev.target)
            id = target.data('target')
            panelLink = $('.navbar [data-toggle="panel"][data-target="' + id + '"]')
            panel = $(id)

            if panel.hasClass 'in'
                panel.removeClass 'in'
                panel.fadeOut()
                panelLink.parent().removeClass 'active'
            else
                panels.removeClass 'in'
                panels.fadeOut()
                panel.addClass 'in'
                panel.fadeIn()
                panelLinks.parent().removeClass 'active'
                panelLink.parent().addClass 'active'

        override.div.on 'click', '.navbar .close', (ev) ->
            ev.preventDefault()
            override.close()

        override.div.on 'click', '#panel-widgets [data-toggle="widget"]', (ev) ->
            ev.preventDefault()
            target = $(ev.target)
            id = target.data('target')
            window.vs.getWidget(id).open()

        override.div.on 'click', '#panel-integrate [data-action="integrate-env"]', (ev) ->
            ev.preventDefault()
            target = $(ev.target)
            env = target.data 'target'
            override.loadIntegrationScript env
            $('#panel-integrate [data-action="integrate-env"]').removeClass('btn-primary').addClass('btn-default')
            target.addClass 'btn-primary'

        override.div.on 'submit', '#integrate-add-widget', (ev) ->
            ev.preventDefault()
            target = $(ev.target)
            productId = target.find('#productId').val()
            buttonSelector = target.find('#buttonSelector').val()
            window[Virtusize].addWidget productId, buttonSelector


    override.render = ->
        override.registerHandlers()

        override.renderNav()
        override.renderPanels()
        override.setIntegrationStatus()

        override.open()

    override.refresh = ->
        override.renderNav()
        override.renderPanels()
        override.setIntegrationStatus()
        override.div.show()
        

    override.renderNav = ->
        override.div.html global.templates["src/templates/bookmarklet.handlebars"] panelLinks: override.getPanelLinksData()

    override.renderPanels = ->
        override.div.find('#vs-panels').remove()
        panelLinks = $('.navbar [data-toggle="panel"]')
        panelLinks.parent().removeClass 'active'
        override.div.append global.templates["src/templates/panels.handlebars"](
            panels: override.getPanelData()
        )

        if override.hasIntegrated()
            env = override.detectEnvironment()
            $('#panel-integrate [data-action="integrate-env"][data-target="' + env + '"]').removeClass('btn-default').addClass('btn-primary')




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
        src = $('#vs-integration').attr 'src'
        if src.match /api\.virtusize\.com/
            'production'
        else if src.match /staging\.virtusize\.com/
            'staging'
        else if src.match /demo\.virtusize\.com/
            'demo'
        else if src.match /dev\.virtusize\.com/
            'dev'
        else 
            'development'

    override.getPanelData = ->
        panels = integrate:
                     id: 'panel-integrate'
                     title: 'Integrate'
                     env_select_box:
                        id: 'integrate-select-env' 
                        options: envs
                        addEmpty: true
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

        if override.hasIntegrated() 
            $.extend panels.debug,
                apiKey: window.vs.apiKey
                bid: window.vs.bid
                snippetVersion: window.vs.snippetVersion
                integrationVersion: window.vs.integrationVersion
                jQueryVersion: jQuery().jquery
                isModernBrowser: ""+window.vs.isModernBrowser
                cookiesDisabled: ""+window.vs.environment.cookiesDisabled
                numberOfWidgets: Object.keys(window.vs.widgets).length
                numberOfOrders: Object.keys(window.vs.orders).length
                location: window.location.href

            $.extend panels.widgets,
                widgets: window.vs.widgets

            $.extend panels.orders,
                orders: window.vs.orders

        panels

    override.getPanelLinksData = ->
        panelLinks = []

        if override.hasIntegrated()
            if (Object.keys(window.vs.orders).length is 0 and Object.keys(window.vs.widgets).length is 0) or
               (Object.keys(window.vs.widgets).length > 0)
                panelLinks.push
                    id: 'panel-integrate'
                    title: 'Integrate'

            if Object.keys(window.vs.widgets).length > 0
                panelLinks.push
                    id: 'panel-purchase'
                    title: 'Purchase'
                panelLinks.push
                    id: 'panel-widgets'
                    title: 'Widgets'

            if Object.keys(window.vs.orders).length > 0
                panelLinks.push
                    id: 'panel-orders'
                    title: 'Orders'

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


    override.loadIntegrationScript = (env) ->
        $('#vs-integration').remove()

        if override.hasIntegrated()
            apiKey = window[Virtusize].apiKey
            window[Virtusize] = null
        else
            apiKey = $('#integrate-apiKey').val()

        script = $('<script type="text/javascript"></script>')
        script.text override.snippet + '(window,document,"script","' + envs[env] + '/integration/v3.js","vs");'
        $('head').append script

        window[Virtusize].setApiKey apiKey 

        override.refresh()



    override.removeUtilIframe = ->
        $("iframe[name=\"virtusize-util-iframe\"]").remove()

    override.removeButtonEventHandlers = ->
        origVsWidget.vsWidgetButton.unbind "click" if origVsWidget? and origVsWidget.vsWidgetButton?

    override.integrate = ->
        availableSizes = (if $("#vsAvailableSizes").val() then JSON.parse($("#vsAvailableSizes").val()) else "not available")
        sizeAliases = (if $("#vsSizeAliases").val() then JSON.parse($("#vsSizeAliases").val()) else "not available")
        override.removeUtilIframe()
        override.removeButtonEventHandlers()
        override.overrideVsWidgetAsyncInit()

    override.loadVsIntegration = ->
        $.getScript "//" + $("#vsEnv").val() + "/widget/v2.js"

    override.purchase = ->
        override.overrideVsOrderConfirmation()

    override.overrideVsOrderConfirmation = ->
        env = $("#vsEnv").val()
        user = $("#vsPurchase-user").val()
        size = $("#vsPurchase-size").val()
        sizeAlias = $("#vsPurchase-size-alias").val()
        image = $("#vsPurchase-image").val()
        if env and user and size and image
            window.vsOrderConfirmation = (order) ->
                order.setApiKey origVsWidget.getApiKey()
                order.setOrderId "order-" + Date.now()
                order.setUserId user
                order.setRegion $("#vsRegion").val() unless $("#vsRegion").val() is "default"
                data =
                    productId: origVsWidget.productData.id
                    size: size
                    imageUrl: image

                data["sizeAlias"] = sizeAlias if sizeAlias
                order.addItem data
                window.console and console.log(order)

            override.loadVsOrderConfirmation()
        else
            messages = []
            messages.push "Please choose an environment"    unless env
            messages.push "Please choose a size"    unless size
            messages.push "Please choose a user"    unless user
            messages.push "Please choose an image"    unless image
            window.console and console.log(messages.join("\n"))
            alert messages.join("\n")

    override.loadVsOrderConfirmation = ->
        vsTemp = window.Virtusize
        $.getScript "//" + $("#vsEnv").val() + "/order-confirmation/v1.js", (data, textStatus, jqxhr) ->
            
            # Move back the original integration window.Virtusize, since
            # order confirmation is polluting the same variable. :(
            window.Virtusize = vsTemp

    override
)(override or {})

