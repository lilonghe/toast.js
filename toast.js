function Toast() {
    this.options = {
        maskStyle: {},
        contentStyle: {
            padding: '8px 15px',
            backgroundColor: 'rgba(0,0,0,.6)',
            position: 'fixed',
            color: '#FFF',
            borderRadius: '2px',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        className: "",
        maskClassName: "",
        duration: 2000,
        targetElement: 'body',
    };

    this.config = function (options) {
        // const { maskStyle={}, contentStyle={}, className, maskClassName, duration, targetElement } = options;
        if (options.className != undefined) {
            this.options.className = options.className;
        }
        if (options.maskClassName != undefined) {
            this.options.className = options.maskClassName;
        }
        if (!isNaN(options.duration)) {
            this.options.duration = options.duration;
        }
        if (options.targetElement) {
            this.options.targetElement = options.targetElement;
        }
    }

    this.mergeOptions = function(oldOptions, newOptions) {
        if (newOptions.className != undefined) {
            oldOptions.className = newOptions.className;
        }
        if (newOptions.maskClassName != undefined) {
            oldOptions.className = newOptions.maskClassName;
        }
        if (!isNaN(newOptions.duration)) {
            oldOptions.duration = newOptions.duration;
        }
        if (newOptions.targetElement) {
            oldOptions.targetElement = newOptions.targetElement;
        }
        return oldOptions;
    }

    this.show = function (text, newOptions) {
        var options = newOptions ? this.mergeOptions(Object.assign(this.options, {}), newOptions) : this.options;
        let current = {};

        if (!current.maskDiv) {
            current.maskDiv = document.createElement('div');
            if (!current.contentDiv) {
                current.contentDiv = document.createElement('div');
                current.maskDiv.appendChild(current.contentDiv);
            }

            //  使用全局配置
            Object.keys(options.maskStyle).map(key => {
                current.maskDiv.style[key] = options.maskStyle[key];
            });
            if (options.maskClassName != undefined) {
                current.maskDiv.maskClassName = options.maskClassName;
            }

            Object.keys(options.contentStyle).map(key => {
                current.contentDiv.style[key] = options.contentStyle[key];
            });
            if (options.className != undefined) {
                current.contentDiv.className = options.className;
            }
        }

        // 使用本次配置
        if (newOptions) {
            Object.keys(options.maskStyle).map(key => {
                current.maskDiv.style[key] = options.maskStyle[key];
            });
            if (options.maskClassName != undefined) {
                current.maskDiv.maskClassName = options.maskClassName;
            }

            Object.keys(options.contentStyle).map(key => {
                current.contentDiv.style[key] = options.contentStyle[key];
            });
            if (options.className != undefined) {
                current.contentDiv.className = options.className;
            }
        }

        current.contentDiv.innerText = text;

        var targetElement = document.querySelector(options.targetElement);
        targetElement.appendChild(current.maskDiv);
        if (options.duration !== 0) {
            var REMOVE_CHILD_TIMEOUT = setTimeout(() => {
                targetElement.removeChild(current.maskDiv);
            }, options.duration);
            current.contentDiv.REMOVE_CHILD_TIMEOUT = REMOVE_CHILD_TIMEOUT;
        }

        current.contentDiv.update = function(text) {
            this.innerText = text;
        }

        current.contentDiv.remove = function() {
            if (this.REMOVE_CHILD_TIMEOUT) {
                window.clearTimeout(this.REMOVE_CHILD_TIMEOUT);
            }
            targetElement.removeChild(current.maskDiv);
        };


        return current.contentDiv;
    }
}

const toast = new Toast();
window.toast = toast;