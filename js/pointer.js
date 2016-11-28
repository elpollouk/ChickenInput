Chicken.register("ChickenInput.pointerHook",
["ChickenFW.resolveElement"],
function (resolveElement) {
    "use strict";

    return function pointerHook(target, handler) {
        target = resolveElement(target);

        target.onmousedown = function pointerHook_onmousedown(e) {
            if (e.button === 0) {
                handler.onPointerDown && handler.onPointerDown(e.clientX - target.offsetLeft, e.clientY - target.offsetTop);
            }
        };

        target.onmouseup = function pointerHook_onmouseup(e) {
            if (e.button === 0) {
                handler.onPointerUp && handler.onPointerUp(e.clientX - target.offsetLeft, e.clientY - target.offsetTop);
            }
        };

        var lastX, lastY = -1;
        target.onmousemove = function pointerHook_onmouseremove(e) {
            if (handler.onPointerMove) {
                var x = e.clientX - target.offsetLeft;
                var y = e.clientY - target.offsetTop;
                var dx, dy;
                if (lastY === -1) {
                    dx = 0;
                    dy = 0;
                }
                else {
                    dx = x - lastX;
                    dy = y - lastY;
                }

                handler.onPointerMove(x, y, dx, dy);

                lastX = x;
                lastY = y;
            }
        };

        return function pointerHook_unhook() {
            target.onmousedown = null;
            target.onmouseup = null;
            target.onmousemove = null;
        };
    };
});
