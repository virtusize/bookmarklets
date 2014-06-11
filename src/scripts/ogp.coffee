ogp = ((ogp) ->
    ogPrefixRegex = /(?:([\S]*):\s?)?http:\/\/ogp.me\/ns#/
    productPrefixRegex = /(?:([\S]*):\s?)?http:\/\/ogp.me\/ns\/product\#/
    ogProperties = [
        "url"
        "title"
        "image"
        "image:url"
        "image:width"
        "image:height"
        "description"
        "locale"
        "site_name"
    ]
    productProperties = [
        "upc"
        "ean"
        "brand"
        "mfr_part_no"
        "size"
        "color"
        "availability"
        "category"
        "price:amount"
        "price:currency"
        "material"
        "pattern"
        "target_gender"
        "age_group"
    ]


    ogp.parse = ->
        metas = $("meta")
        ogData = {}

        $.each metas, (index, meta) ->
            meta = $(meta)
            p = meta.attr("property")
            n = meta.attr("name")
            
            if ogp.validProperty(p, ogp.concatAllProperties())
                ogp.setData meta, p, ogData
            else if ogp.validProperty(n, ogp.concatAllProperties())
                ogp.setData meta, n, ogData 

        ogData


    ogp.setData = (meta, property, data) ->
        prefixes = ogp.parsePrefix(ogp.selectPrefix())
        key = property.replace(prefixes.og + ":", "").replace(prefixes.product + ":", "")

        data[key] = [data[key]] if data[key] and not $.isArray(data[key])

        if $.isArray(data[key])
            data[key].push meta.attr("content")
        else
            data[key] = meta.attr("content")

        return


    ogp.parsePrefix = (prefixes) ->
        res =
            og: "og"
            product: "og:product"

        if prefixes.length > 0
            $.each prefixes, (index, prefix) ->
                ogMatch = prefix.value.match(ogPrefixRegex)
                productMatch = prefix.value.match(productPrefixRegex)

                if ogMatch and ogMatch.length is 2 and ogMatch[1]
                    res.og = ogMatch[1]
                else if ogMatch and prefix.name.match(/xmlns:/)
                    res.og = prefix.name.replace(/xmlns:/, "") 
                
                if productMatch and productMatch.length is 2 and productMatch[1]
                    res.product = productMatch[1]
                else if productMatch and prefix.name.match(/xmlns:/)
                    res.product = prefix.name.replace(/xmlns:/, "")
                else
                    res.product = res.og + ":product"

                return

        res


    ogp.selectPrefix = ->
        html = $("html")
        head = $("head")
        prefix = ogp.extractPrefix(head[0])
        prefix = ogp.extractPrefix(html[0]) if prefix.length is 0
        prefix


    ogp.extractPrefix = (el) ->
        prefix = []
        $.each el.attributes, (index, attr) ->
            p = {}
            if attr.value.match(/ogp\.me/)
                p.name = attr.name
                p.value = attr.value
                prefix.push p

        prefix


    ogp.concatAllProperties = ->
        prefixes = ogp.parsePrefix(ogp.selectPrefix())
        $.merge ogp.concatProperties(prefixes.og, ogProperties), ogp.concatProperties(prefixes.product, productProperties)


    ogp.concatProperties = (prefix, props) ->
        res = []
        $.each props, (index, prop) ->
            res.push prefix + ":" + prop

        res


    ogp.validProperty = (property, validProperties) ->
        property and $.inArray(property, validProperties) isnt -1


    ogp
)(ogp or {})
