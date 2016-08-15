<template>
    <section>
        <component :is='app' :context-path='path'></component>
    </section>
</template>

<script>
    var _cachedApp = [];

    var _loadScript = (url, callback) => {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onreadystatechange = function () {
            if (this.readyState === 'complete') {
                callback();
            }
        };

        script.onload = function () {
            callback();
        };

        script.src = url;
        head.appendChild(script);
    };

    var _loadWidget = (vm, widgetName) => {
        var dfd = $.Deferred();

        // 已经加载过的app，可以直接使用
        if (_cachedApp.indexOf(widgetName) > -1) {
            vm.app = widgetName;
            dfd.resolve();
            return dfd.promise();
        }

        var widgetUrl = '/apps/' + widgetName + '.js';
        _loadScript(widgetUrl, () => {
            // console.log(widgetName + ' loaded');
            vm.app = widgetName;
            _cachedApp.push(widgetName);
            dfd.resolve();
        });

        return dfd.promise();
    };

    export default {
        data () {
            return {
                fullPath: '',
                path: '',
                app: null
            };
        },
        route: {
            activate (transition) {
                var matched = transition.to.matched;
                this.fullPath = matched[matched.length - 1].handler.fullPath;
                transition.next();
            },
            data (transition) {
                var appId = transition.to.params.id;
                var name = appId;
                this.path = this.fullPath.replace(':id', appId);
                _loadWidget(this, name).done(() => {
                    transition.next();
                });
            }
        }
    };
</script>
