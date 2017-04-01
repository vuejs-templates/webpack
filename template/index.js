/**
 * @index
 * @author  stylehuan
 * @create  2017-03-14 13:46
 */
{{#ProjectType}}
import appInterface from './src/plugins/appInterface'
{{/ProjectType}}

export {
    {{#ProjectType}}
    appInterface
    {{/ProjectType}}
}