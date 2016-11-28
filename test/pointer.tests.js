(function () {
"use strict";

var mocks = {}

var fetchPointerHook = function (expected, result) {
    var mockResolveElement = function (element) {
        Assert.isSame(expected, element);
        return result || expected;
    }

    var mocks = {};
    mocks["ChickenFW.resolveElement"] = mockResolveElement;

    return Chicken.fetch("ChickenInput.pointerHook", mocks);
}

var newMockElement = function (offsetLeft, offsetTop) {
    return {
        offsetLeft: offsetLeft || 0,
        offsetTop: offsetTop || 0
    };
}

window.Tests.PointerTests = {
    pointerHook: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook("testElement", mockElement);

        var unhook = pointerHook("testElement", {});

        Assert.isSame("function", typeof unhook);
        Assert.isSame("function", typeof mockElement.onmouseup);
        Assert.isSame("function", typeof mockElement.onmousedown);
        Assert.isSame("function", typeof mockElement.onmousemove);
    },

    unhook: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook("testElement", mockElement);

        var unhook = pointerHook("testElement", {});
        unhook();

        Assert.isNull(mockElement.onmouseup);
        Assert.isNull(mockElement.onmousedown);
        Assert.isNull(mockElement.onmousemove);
    },

    mouseEvent_noHandlerFunctions: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);

        pointerHook(mockElement, {});

        mockElement.onmouseup({button: 0});
        mockElement.onmousedown({button: 0});
        mockElement.onmousemove({});
    },

    mouseEvent_mousedown: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerDown: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmousedown({
            button: 0,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(1, mockHandler.onPointerDown.calls.length);
        Assert.isEqual(20, mockHandler.onPointerDown.calls[0][0]);
        Assert.isEqual(50, mockHandler.onPointerDown.calls[0][1]);

        mockElement.onmousedown({
            button: 0,
            clientX: 70,
            clientY: 40
        });

        Assert.isEqual(2, mockHandler.onPointerDown.calls.length);
        Assert.isEqual(70, mockHandler.onPointerDown.calls[1][0]);
        Assert.isEqual(40, mockHandler.onPointerDown.calls[1][1]);
    },

    mouseEvent_mousedown_elementOffset: function () {
        var mockElement = newMockElement(10, 20);
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerDown: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmousedown({
            button: 0,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(1, mockHandler.onPointerDown.calls.length);
        Assert.isEqual(10, mockHandler.onPointerDown.calls[0][0]);
        Assert.isEqual(30, mockHandler.onPointerDown.calls[0][1]);
    },

    mouseEvent_mousedown_rightButton: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerDown: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmousedown({
            button: 2,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(0, mockHandler.onPointerDown.calls.length);
    },

    mouseEvent_mouseup: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerUp: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmouseup({
            button: 0,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(1, mockHandler.onPointerUp.calls.length);
        Assert.isEqual(20, mockHandler.onPointerUp.calls[0][0]);
        Assert.isEqual(50, mockHandler.onPointerUp.calls[0][1]);

        mockElement.onmouseup({
            button: 0,
            clientX: 70,
            clientY: 40
        });

        Assert.isEqual(2, mockHandler.onPointerUp.calls.length);
        Assert.isEqual(70, mockHandler.onPointerUp.calls[1][0]);
        Assert.isEqual(40, mockHandler.onPointerUp.calls[1][1]);
    },

    mouseEvent_mouseup_elementOffset: function () {
        var mockElement = newMockElement(5, 4);
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerUp: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmouseup({
            button: 0,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(1, mockHandler.onPointerUp.calls.length);
        Assert.isEqual(15, mockHandler.onPointerUp.calls[0][0]);
        Assert.isEqual(46, mockHandler.onPointerUp.calls[0][1]);
    },

    mouseEvent_mouseup_rightButton: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerUp: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmouseup({
            button: 2,
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(0, mockHandler.onPointerUp.calls.length);
    },

    mouseEvent_mousemove: function () {
        var mockElement = newMockElement();
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerMove: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmousemove({
            clientX: 2,
            clientY: 5
        });

        Assert.isEqual(1, mockHandler.onPointerMove.calls.length);
        Assert.isEqual(2, mockHandler.onPointerMove.calls[0][0]);
        Assert.isEqual(5, mockHandler.onPointerMove.calls[0][1]);
        Assert.isEqual(0, mockHandler.onPointerMove.calls[0][2]);
        Assert.isEqual(0, mockHandler.onPointerMove.calls[0][3]);

        mockElement.onmousemove({
            clientX: 6,
            clientY: 3
        });

        Assert.isEqual(2, mockHandler.onPointerMove.calls.length);
        Assert.isEqual(6, mockHandler.onPointerMove.calls[1][0]);
        Assert.isEqual(3, mockHandler.onPointerMove.calls[1][1]);
        Assert.isEqual(4, mockHandler.onPointerMove.calls[1][2]);
        Assert.isEqual(-2, mockHandler.onPointerMove.calls[1][3]);
    },

    mouseEvent_mousemove_elementOffset: function () {
        var mockElement = newMockElement(12, 23);
        var pointerHook = fetchPointerHook(mockElement);
        var mockHandler = {
            onPointerMove: Test.mockFunction()
        }

        pointerHook(mockElement, mockHandler);
        mockElement.onmousemove({
            clientX: 20,
            clientY: 50
        });

        Assert.isEqual(1, mockHandler.onPointerMove.calls.length);
        Assert.isEqual(8, mockHandler.onPointerMove.calls[0][0]);
        Assert.isEqual(27, mockHandler.onPointerMove.calls[0][1]);
        Assert.isEqual(0, mockHandler.onPointerMove.calls[0][2]);
        Assert.isEqual(0, mockHandler.onPointerMove.calls[0][3]);

        mockElement.onmousemove({
            clientX: 60,
            clientY: 30
        });

        Assert.isEqual(2, mockHandler.onPointerMove.calls.length);
        Assert.isEqual(48, mockHandler.onPointerMove.calls[1][0]);
        Assert.isEqual(7, mockHandler.onPointerMove.calls[1][1]);
        Assert.isEqual(40, mockHandler.onPointerMove.calls[1][2]);
        Assert.isEqual(-20, mockHandler.onPointerMove.calls[1][3]);
    },
}

})();
