import { __values } from 'tslib';
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgSelect2Component = /** @class */ (function () {
    // private style = `CSS`;
    function NgSelect2Component(renderer, zone, _element) {
        this.renderer = renderer;
        this.zone = zone;
        this._element = _element;
        // value for placeholder
        this.placeholder = '';
        this.dropdownParent = '';
        this.allowClear = false;
        // enable / disable select2
        this.disabled = false;
        // emitter when value is changed
        this.valueChanged = new EventEmitter();
        this.element = undefined;
        this.check = false;
        this.propagateChange = function (value) { };
    }
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.element) {
            return;
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // if (this.cssImport) {
        //   const head = document.getElementsByTagName('head')[0];
        //   const link: any = head.children[head.children.length - 1];
        //   if (!link.version) {
        //     const newLink = this.renderer.createElement(head, 'style');
        //     this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //     this.renderer.setElementProperty(newLink, 'version', 'select2');
        //     this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //   }
        // }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var /** @type {?} */ newValue = void 0;
            if ((!this.allowClear && !this.options.allowClear) && changes['data'].currentValue.length === 1) {
                newValue = changes['data'].currentValue[0].id;
            }
            else {
                newValue = this.value;
            }
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var /** @type {?} */ newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setElementAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            var /** @type {?} */ newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.element.off('select2:select');
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.initPlugin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project.' +
                    'You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }
            return;
        }
        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        var /** @type {?} */ options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
        // this.options.placeholder = '::SELECT::';
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                options.matcher = oldMatcher(options.matcher);
                _this.element.select2(options);
                if (typeof _this.value !== 'undefined') {
                    _this.setElementValue(_this.value);
                }
            });
        }
        else {
            this.element.select2(options);
        }
        this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    /**
     * @param {?} newValue
     * @return {?}
     */
    NgSelect2Component.prototype.setElementValue = /**
     * @param {?} newValue
     * @return {?}
     */
    function (newValue) {
        // this.zone.run(() => {
        if (Array.isArray(newValue)) {
            try {
                for (var _a = __values(this.selector.nativeElement.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var option = _b.value;
                    this.renderer.setElementProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
        var e_1, _c;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelect2Component.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    /**
     * @return {?}
     */
    NgSelect2Component.prototype.registerOnTouched = /**
     * @return {?}
     */
    function () {
    };
    NgSelect2Component.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select2',
                    template: "<select #selector>\n  <ng-content select=\"option, optgroup\">\n  </ng-content>\n</select>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgSelect2Component; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    NgSelect2Component.ctorParameters = function () { return [
        { type: Renderer, },
        { type: NgZone, },
        { type: ElementRef, },
    ]; };
    NgSelect2Component.propDecorators = {
        "selector": [{ type: ViewChild, args: ['selector',] },],
        "data": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "dropdownParent": [{ type: Input },],
        "allowClear": [{ type: Input },],
        "value": [{ type: Input },],
        "width": [{ type: Input },],
        "disabled": [{ type: Input },],
        "options": [{ type: Input },],
        "valueChanged": [{ type: Output },],
    };
    return NgSelect2Component;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgSelect2Module = /** @class */ (function () {
    function NgSelect2Module() {
    }
    NgSelect2Module.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [NgSelect2Component],
                    exports: [NgSelect2Component]
                },] },
    ];
    return NgSelect2Module;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgSelect2Component, NgSelect2Module };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctc2VsZWN0Mi9saWIvbmctc2VsZWN0Mi5jb21wb25lbnQudHMiLCJuZzovL25nLXNlbGVjdDIvbGliL25nLXNlbGVjdDIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic2VsZWN0MlwiIC8+XHJcbmltcG9ydCB7XHJcbiAgZm9yd2FyZFJlZixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJ3NlbGVjdDInO1xyXG5pbXBvcnQgeyBTZWxlY3QyT3B0aW9uRGF0YSB9IGZyb20gJy4vbmctc2VsZWN0Mi5pbnRlcmZhY2UnO1xyXG5cclxuZGVjbGFyZSB2YXIgalF1ZXJ5OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLXNlbGVjdDInLFxyXG4gIHRlbXBsYXRlOiBgPHNlbGVjdCAjc2VsZWN0b3I+XHJcbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwib3B0aW9uLCBvcHRncm91cFwiPlxyXG4gIDwvbmctY29udGVudD5cclxuPC9zZWxlY3Q+XHJcbmAsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0MkNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJykgc2VsZWN0b3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8vIGRhdGEgZm9yIHNlbGVjdDIgZHJvcCBkb3duXHJcbiAgQElucHV0KCkgZGF0YTogQXJyYXk8U2VsZWN0Mk9wdGlvbkRhdGE+O1xyXG5cclxuICAvLyB2YWx1ZSBmb3IgcGxhY2Vob2xkZXJcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBkcm9wZG93blBhcmVudCA9ICcnO1xyXG5cclxuXHJcbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG5cclxuICAvLyB2YWx1ZSBmb3Igc2VsZWN0MlxyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcclxuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZWxlbWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgY2hlY2sgPSBmYWxzZTtcclxuICAvLyBwcml2YXRlIHN0eWxlID0gYENTU2A7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gaWYgKHRoaXMuY3NzSW1wb3J0KSB7XHJcbiAgICAvLyAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG4gICAgLy8gICBjb25zdCBsaW5rOiBhbnkgPSBoZWFkLmNoaWxkcmVuW2hlYWQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgLy8gICBpZiAoIWxpbmsudmVyc2lvbikge1xyXG4gICAgLy8gICAgIGNvbnN0IG5ld0xpbmsgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoaGVhZCwgJ3N0eWxlJyk7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3R5cGUnLCAndGV4dC9jc3MnKTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShuZXdMaW5rLCAndmVyc2lvbicsICdzZWxlY3QyJyk7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ2lubmVySFRNTCcsIHRoaXMuc3R5bGUpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkYXRhJ10gJiYgSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLnByZXZpb3VzVmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlKSkge1xyXG4gICAgICB0aGlzLmluaXRQbHVnaW4oKTtcclxuICAgICAgbGV0IG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgICAgIGlmICgoIXRoaXMuYWxsb3dDbGVhciAmJiAhdGhpcy5vcHRpb25zLmFsbG93Q2xlYXIpICYmIGNoYW5nZXNbJ2RhdGEnXS5jdXJyZW50VmFsdWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2VzWydkYXRhJ10uY3VycmVudFZhbHVlWzBdLmlkO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3ZhbHVlJ10gJiYgY2hhbmdlc1sndmFsdWUnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSkge1xyXG5cclxuICAgICAgY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlO1xyXG5cclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXHJcbiAgICAgICAgZGF0YTogdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2RhdGEnKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSAmJiBjaGFuZ2VzWydkaXNhYmxlZCddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgdGhpcy5kaXNhYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10gJiYgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1wbGFjZWhvbGRlcicsIHRoaXMucGxhY2Vob2xkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkcm9wZG93blBhcmVudCddICYmIGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snYWxsb3dDbGVhciddICYmIGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydhbGxvd0NsZWFyJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWFsbG93LWNsZWFyJywgdGhpcy5hbGxvd0NsZWFyLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0galF1ZXJ5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1wbGFjZWhvbGRlcicsIHRoaXMucGxhY2Vob2xkZXIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2RhdGEtZHJvcGRvd25QYXJlbnQnLCB0aGlzLmRyb3Bkb3duUGFyZW50KTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWFsbG93LWNsZWFyJywgdGhpcy5hbGxvd0NsZWFyLnRvU3RyaW5nKCkpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLmluaXRQbHVnaW4oKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudC5vbignc2VsZWN0MjpzZWxlY3Qgc2VsZWN0Mjp1bnNlbGVjdCcsIChlOiBhbnkpID0+IHtcclxuICAgICAgLy8gY29uc3QgbmV3VmFsdWU6IHN0cmluZyA9IChlLnR5cGUgPT09ICdzZWxlY3QyOnVuc2VsZWN0JykgPyAnJyA6IHRoaXMuZWxlbWVudC52YWwoKTtcclxuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmVsZW1lbnQudmFsKCk7XHJcblxyXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXHJcbiAgICAgICAgZGF0YTogdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2RhdGEnKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5vZmYoJ3NlbGVjdDI6c2VsZWN0Jyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRQbHVnaW4oKSB7XHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5zZWxlY3QyKSB7XHJcbiAgICAgIGlmICghdGhpcy5jaGVjaykge1xyXG4gICAgICAgIHRoaXMuY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgYWRkIFNlbGVjdDIgbGlicmFyeSAoanMgZmlsZSkgdG8gdGhlIHByb2plY3QuJyArXHJcbiAgICAgICAgICAnWW91IGNhbiBkb3dubG9hZCBpdCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWxlY3QyL3NlbGVjdDIvdHJlZS9tYXN0ZXIvZGlzdC9qcy4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHNlbGVjdDIgYWxyZWFkeSBpbml0aWFsaXplZCByZW1vdmUgaGltIGFuZCByZW1vdmUgYWxsIHRhZ3MgaW5zaWRlXHJcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0NsYXNzKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJykgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcHRpb25zOiBPcHRpb25zID0ge1xyXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgIHdpZHRoOiAodGhpcy53aWR0aCkgPyB0aGlzLndpZHRoIDogJ3Jlc29sdmUnLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5kcm9wZG93blBhcmVudCkge1xyXG4gICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcclxuICAgICAgICBkcm9wZG93blBhcmVudDogalF1ZXJ5KCcjJyArIHRoaXMuZHJvcGRvd25QYXJlbnQpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciA9ICc6OlNFTEVDVDo6JztcclxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywgdGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5tYXRjaGVyKSB7XHJcbiAgICAgIGpRdWVyeS5mbi5zZWxlY3QyLmFtZC5yZXF1aXJlKFsnc2VsZWN0Mi9jb21wYXQvbWF0Y2hlciddLCAob2xkTWF0Y2hlcjogYW55KSA9PiB7XHJcbiAgICAgICAgb3B0aW9ucy5tYXRjaGVyID0gb2xkTWF0Y2hlcihvcHRpb25zLm1hdGNoZXIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdDIob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG5cclxuICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xyXG5cclxuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50Lm9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShvcHRpb24sICdzZWxlY3RlZCcsIChuZXdWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xyXG4gICAgfVxyXG4gICAgLy8gfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcblxyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZC5zdWJzY3JpYmUoZm4pO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ1NlbGVjdDJDb21wb25lbnQgfSBmcm9tICcuL25nLXNlbGVjdDIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ1NlbGVjdDJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ1NlbGVjdDJDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdDJNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQTRFRSw0QkFBb0IsUUFBa0IsRUFBUyxJQUFZLEVBQVMsUUFBb0I7UUFBcEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFB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