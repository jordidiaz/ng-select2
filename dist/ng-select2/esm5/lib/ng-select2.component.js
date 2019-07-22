import * as tslib_1 from "tslib";
/// <reference types="select2" />
import { forwardRef, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var NgSelect2Component = /** @class */ (function () {
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
    NgSelect2Component_1 = NgSelect2Component;
    NgSelect2Component.prototype.ngDoCheck = function () {
        if (!this.element) {
            return;
        }
    };
    NgSelect2Component.prototype.ngOnInit = function () {
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
    NgSelect2Component.prototype.ngOnChanges = function (changes) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();
            var newValue = this.currentValue ? this.currentValue : this.value;
            this.setElementValue(newValue);
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {
            var newValue = changes['value'].currentValue;
            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data'),
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.element.data('select2').$container.find('.select2-selection__placeholder').text(this.placeholder);
        }
        if (changes['dropdownParent'] && changes['dropdownParent'].previousValue !== changes['dropdownParent'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    };
    NgSelect2Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-dropdownParent', this.dropdownParent);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);
        this.initPlugin();
        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:select select2:unselect', function (e) {
            e.params.originalEvent.stopPropagation();
            // const newValue: string = (e.type === 'select2:unselect') ? '' : this.element.val();
            var newValue = _this.element.val();
            _this.valueChanged.emit({
                value: newValue,
                data: _this.element.select2('data'),
            });
            _this.propagateChange(newValue);
            _this.setElementValue(newValue);
        });
    };
    NgSelect2Component.prototype.ngOnDestroy = function () {
        this.element.off('select2:select');
    };
    NgSelect2Component.prototype.initPlugin = function () {
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
            // Store current selected value
            this.currentValue = this.getCurrentValue();
            this.element.select2('destroy');
            this.renderer.setProperty(this.selector.nativeElement, 'innerHTML', '');
        }
        var options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve',
            placeholder: this.placeholder
        };
        if (this.dropdownParent) {
            options = {
                data: this.data,
                width: (this.width) ? this.width : 'resolve',
                dropdownParent: jQuery('#' + this.dropdownParent),
            };
        }
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
        this.renderer.setProperty(this.selector.nativeElement, 'disabled', this.disabled);
    };
    NgSelect2Component.prototype.getCurrentValue = function () {
        var selectedIndex = this.element[0].options.selectedIndex;
        return selectedIndex !== -1
            ? this.element[0].options[selectedIndex].value
            : null;
    };
    NgSelect2Component.prototype.setElementValue = function (newValue) {
        // this.zone.run(() => {
        var e_1, _a;
        if (Array.isArray(newValue)) {
            try {
                for (var _b = tslib_1.__values(this.selector.nativeElement.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    this.renderer.setProperty(option, 'selected', (newValue.indexOf(option.value) > -1));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.renderer.setProperty(this.selector.nativeElement, 'value', newValue);
        }
        if (this.element) {
            this.element.trigger('change.select2');
        }
        // });
    };
    NgSelect2Component.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    };
    NgSelect2Component.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
        this.valueChanged.subscribe(fn);
    };
    NgSelect2Component.prototype.registerOnTouched = function () {
    };
    var NgSelect2Component_1;
    tslib_1.__decorate([
        ViewChild('selector', { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], NgSelect2Component.prototype, "selector", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NgSelect2Component.prototype, "data", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "dropdownParent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "allowClear", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], NgSelect2Component.prototype, "width", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "options", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NgSelect2Component.prototype, "valueChanged", void 0);
    NgSelect2Component = NgSelect2Component_1 = tslib_1.__decorate([
        Component({
            selector: 'ng-select2',
            template: "<select #selector>\r\n  <ng-content select=\"option, optgroup\">\r\n  </ng-content>\r\n</select>\r\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NgSelect2Component_1; }),
                    multi: true,
                },
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2, NgZone, ElementRef])
    ], NgSelect2Component);
    return NgSelect2Component;
}());
export { NgSelect2Component };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1zZWxlY3QyLyIsInNvdXJjZXMiOlsibGliL25nLXNlbGVjdDIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBaUM7QUFDakMsT0FBTyxFQUNMLFVBQVUsRUFFVix1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBbUJ6RTtJQW1DRSw0QkFBb0IsUUFBbUIsRUFBUyxJQUFZLEVBQVMsUUFBb0I7UUFBckUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBN0J6Rix3QkFBd0I7UUFDZixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBUTVCLDJCQUEyQjtRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSzFCLGdDQUFnQztRQUN0QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEMsWUFBTyxHQUFRLFNBQVMsQ0FBQztRQUN6QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBeUx0QixvQkFBZSxHQUFHLFVBQUMsS0FBVSxJQUFPLENBQUMsQ0FBQztJQW5MdEMsQ0FBQzsyQkFwQ1Usa0JBQWtCO0lBc0M3QixzQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTztTQUNSO0lBQ0gsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSx3QkFBd0I7UUFDeEIsMkRBQTJEO1FBQzNE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QUFDO0lBQ2xDLENBQUM7SUFFRCw4Q0FBaUIsR0FBakI7SUFDQSxDQUFDOztJQTlOd0M7UUFBeEMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzswQ0FBVyxVQUFVO3dEQUFDO0lBR3JEO1FBQVIsS0FBSyxFQUFFOzBDQUFPLEtBQUs7b0RBQW9CO0lBRy9CO1FBQVIsS0FBSyxFQUFFOzsyREFBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7OzhEQUFxQjtJQUdwQjtRQUFSLEtBQUssRUFBRTs7MERBQW9CO0lBR25CO1FBQVIsS0FBSyxFQUFFOztxREFBMEI7SUFHekI7UUFBUixLQUFLLEVBQUU7O3FEQUFlO0lBR2Q7UUFBUixLQUFLLEVBQUU7O3dEQUFrQjtJQUdqQjtRQUFSLEtBQUssRUFBRTs7dURBQWtCO0lBR2hCO1FBQVQsTUFBTSxFQUFFOzs0REFBbUM7SUEzQmpDLGtCQUFrQjtRQWI5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixnSEFBMEM7WUFDMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFrQixFQUFsQixDQUFrQixDQUFDO29CQUNqRCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztpREFvQzhCLFNBQVMsRUFBZSxNQUFNLEVBQW1CLFVBQVU7T0FuQzlFLGtCQUFrQixDQWdPOUI7SUFBRCx5QkFBQztDQUFBLEFBaE9ELElBZ09DO1NBaE9ZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwic2VsZWN0MlwiIC8+XHJcbmltcG9ydCB7XHJcbiAgZm9yd2FyZFJlZixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdDJPcHRpb25EYXRhIH0gZnJvbSAnLi9uZy1zZWxlY3QyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICdzZWxlY3QyJztcclxuXHJcbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctc2VsZWN0Mi5jb21wb25lbnQuaHRtbCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0MkNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdTZWxlY3QyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdG9yJywgeyBzdGF0aWM6IHRydWUgfSkgc2VsZWN0b3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8vIGRhdGEgZm9yIHNlbGVjdDIgZHJvcCBkb3duXHJcbiAgQElucHV0KCkgZGF0YTogQXJyYXk8U2VsZWN0Mk9wdGlvbkRhdGE+O1xyXG5cclxuICAvLyB2YWx1ZSBmb3IgcGxhY2Vob2xkZXJcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBkcm9wZG93blBhcmVudCA9ICcnO1xyXG5cclxuXHJcbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG5cclxuICAvLyB2YWx1ZSBmb3Igc2VsZWN0MlxyXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgLy8gd2lkdGggb2Ygc2VsZWN0MiBpbnB1dFxyXG4gIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XHJcblxyXG4gIC8vIGVuYWJsZSAvIGRpc2FibGUgc2VsZWN0MlxyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIGFsbCBhZGRpdGlvbmFsIG9wdGlvbnNcclxuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvLyBlbWl0dGVyIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZWxlbWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgY2hlY2sgPSBmYWxzZTtcclxuICAvLyBwcml2YXRlIHN0eWxlID0gYENTU2A7XHJcblxyXG4gIHByaXZhdGUgY3VycmVudFZhbHVlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIGlmICh0aGlzLmNzc0ltcG9ydCkge1xyXG4gICAgLy8gICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuICAgIC8vICAgY29uc3QgbGluazogYW55ID0gaGVhZC5jaGlsZHJlbltoZWFkLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIC8vICAgaWYgKCFsaW5rLnZlcnNpb24pIHtcclxuICAgIC8vICAgICBjb25zdCBuZXdMaW5rID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KGhlYWQsICdzdHlsZScpO1xyXG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICd0eXBlJywgJ3RleHQvY3NzJyk7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmV3TGluaywgJ3ZlcnNpb24nLCAnc2VsZWN0MicpO1xyXG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFByb3BlcnR5KG5ld0xpbmssICdpbm5lckhUTUwnLCB0aGlzLnN0eWxlKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG5cclxuICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1snZGF0YSddICYmIEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbJ2RhdGEnXS5wcmV2aW91c1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1snZGF0YSddLmN1cnJlbnRWYWx1ZSkpIHtcclxuICAgICAgdGhpcy5pbml0UGx1Z2luKCk7XHJcblxyXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuY3VycmVudFZhbHVlID8gdGhpcy5jdXJyZW50VmFsdWUgOiB0aGlzLnZhbHVlO1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSAmJiBjaGFuZ2VzWyd2YWx1ZSddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKSB7XHJcblxyXG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XHJcblxyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2VkLmVtaXQoe1xyXG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgICBkYXRhOiB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGF0YScpLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobmV3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddICYmIGNoYW5nZXNbJ2Rpc2FibGVkJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZGlzYWJsZWQnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIHRoaXMuZGlzYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydwbGFjZWhvbGRlciddICYmIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmRhdGEoJ3NlbGVjdDInKS4kY29udGFpbmVyLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXInKS50ZXh0KHRoaXMucGxhY2Vob2xkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydkcm9wZG93blBhcmVudCddICYmIGNoYW5nZXNbJ2Ryb3Bkb3duUGFyZW50J10ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlc1snZHJvcGRvd25QYXJlbnQnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1kcm9wZG93blBhcmVudCcsIHRoaXMuZHJvcGRvd25QYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydhbGxvd0NsZWFyJ10gJiYgY2hhbmdlc1snYWxsb3dDbGVhciddLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXNbJ2FsbG93Q2xlYXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGpRdWVyeSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1kcm9wZG93blBhcmVudCcsIHRoaXMuZHJvcGRvd25QYXJlbnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGF0YS1hbGxvdy1jbGVhcicsIHRoaXMuYWxsb3dDbGVhci50b1N0cmluZygpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCk7XHJcblxyXG4gICAgdGhpcy5pbml0UGx1Z2luKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnQub24oJ3NlbGVjdDI6c2VsZWN0IHNlbGVjdDI6dW5zZWxlY3QnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgIGUucGFyYW1zLm9yaWdpbmFsRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIC8vIGNvbnN0IG5ld1ZhbHVlOiBzdHJpbmcgPSAoZS50eXBlID09PSAnc2VsZWN0Mjp1bnNlbGVjdCcpID8gJycgOiB0aGlzLmVsZW1lbnQudmFsKCk7XHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICAgIGRhdGE6IHRoaXMuZWxlbWVudC5zZWxlY3QyKCdkYXRhJyksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShuZXdWYWx1ZSk7XHJcbiAgICAgIHRoaXMuc2V0RWxlbWVudFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQub2ZmKCdzZWxlY3QyOnNlbGVjdCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UGx1Z2luKCkge1xyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc2VsZWN0Mikge1xyXG4gICAgICBpZiAoIXRoaXMuY2hlY2spIHtcclxuICAgICAgICB0aGlzLmNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnUGxlYXNlIGFkZCBTZWxlY3QyIGxpYnJhcnkgKGpzIGZpbGUpIHRvIHRoZSBwcm9qZWN0LicgK1xyXG4gICAgICAgICAgJ1lvdSBjYW4gZG93bmxvYWQgaXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2VsZWN0Mi9zZWxlY3QyL3RyZWUvbWFzdGVyL2Rpc3QvanMuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBzZWxlY3QyIGFscmVhZHkgaW5pdGlhbGl6ZWQgcmVtb3ZlIGhpbSBhbmQgcmVtb3ZlIGFsbCB0YWdzIGluc2lkZVxyXG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNDbGFzcygnc2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZScpID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIFN0b3JlIGN1cnJlbnQgc2VsZWN0ZWQgdmFsdWVcclxuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSB0aGlzLmdldEN1cnJlbnRWYWx1ZSgpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MignZGVzdHJveScpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc2VsZWN0b3IubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3B0aW9uczogT3B0aW9ucyA9IHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICB3aWR0aDogKHRoaXMud2lkdGgpID8gdGhpcy53aWR0aCA6ICdyZXNvbHZlJyxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXJcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuZHJvcGRvd25QYXJlbnQpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgd2lkdGg6ICh0aGlzLndpZHRoKSA/IHRoaXMud2lkdGggOiAncmVzb2x2ZScsXHJcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6IGpRdWVyeSgnIycgKyB0aGlzLmRyb3Bkb3duUGFyZW50KSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMubWF0Y2hlcikge1xyXG4gICAgICBqUXVlcnkuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZShbJ3NlbGVjdDIvY29tcGF0L21hdGNoZXInXSwgKG9sZE1hdGNoZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMubWF0Y2hlciA9IG9sZE1hdGNoZXIob3B0aW9ucy5tYXRjaGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0MihvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3QyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zZWxlY3Rvci5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCB0aGlzLmRpc2FibGVkKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBnZXRDdXJyZW50VmFsdWUoKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5lbGVtZW50WzBdLm9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcclxuICAgIHJldHVybiBzZWxlY3RlZEluZGV4ICE9PSAtMVxyXG4gICAgICA/IHRoaXMuZWxlbWVudFswXS5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLnZhbHVlXHJcbiAgICAgIDogbnVsbDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXRFbGVtZW50VmFsdWUobmV3VmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XHJcblxyXG4gICAgLy8gdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQub3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkob3B0aW9uLCAnc2VsZWN0ZWQnLCAobmV3VmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnNlbGVjdG9yLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xyXG4gICAgfVxyXG4gICAgLy8gfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcblxyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnNldEVsZW1lbnRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAodmFsdWU6IGFueSkgPT4geyB9O1xyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZC5zdWJzY3JpYmUoZm4pO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==