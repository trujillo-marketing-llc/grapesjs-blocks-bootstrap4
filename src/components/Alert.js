import _s from "underscore.string";
import contexts from '../bootstrap-contexts';
import exclamationIcon from "raw-loader!../icons/exclamation-triangle-solid.svg";

export const AlertBlock = (bm, label, cat) => {
    bm.add('bs-alert', {
        label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
        category: cat,
        content: {
            type: 'bs-alert',
            content: 'This is an alert—check it out!'
        }
    });
};

export default (domc) => {
    const textType = domc.getType('text');
    const textModel = textType.model;
    const textView = textType.view;

    domc.addType('bs-alert', {
        model: textModel.extend({
            defaults: Object.assign({}, textModel.prototype.defaults, {
                'custom-name': 'Alert',
                tagName: 'div',
                classes: ['alert'],
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'None'},
                            ... contexts.map(function(v) { return {value: 'alert-'+v, name: _s.capitalize(v)} })
                        ],
                        label: 'Context'
                    }
                ].concat(textModel.prototype.defaults.traits)
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('alert')) {
                    return {type: 'bs-alert'};
                }
            }
        }),
        view: textView
    });
}
