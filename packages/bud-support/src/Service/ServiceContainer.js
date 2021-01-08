"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const lodash_1 = require("lodash");
const container_1 = require("@roots/container");
/**
 * Application service base
 */
class ServiceContainer extends container_1.Container {
    /**
     * Constructor
     */
    constructor(items) {
        super({});
        /**
         * Has prop?
         */
        this.hasProp = function (name) {
            return lodash_1.has(this, name);
        };
        this._app = () => items.app;
        if (items.containers) {
            Object.entries(items.containers).forEach(([name, repo]) => (this[name] = new container_1.Container(repo)));
        }
        Object.entries(items)
            .filter(([key]) => {
            return key !== 'app' && key !== 'containers';
        })
            .forEach(([key, value]) => {
            this[key] = value;
        });
    }
    /**
     * Register service
     */
    register() {
        return;
    }
    /**
     * Boot service
     */
    boot() {
        return;
    }
    /**
     * Application accessor
     */
    get app() {
        return this._app();
    }
}
exports.ServiceContainer = ServiceContainer;
//# sourceMappingURL=ServiceContainer.js.map