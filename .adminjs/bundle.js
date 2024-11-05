(function (React) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const ImageComponent$2 = props => {
      const {
        record
      } = props;
      const imageUrl = "/get-image" + record?.params?.selfieImagePath.split("uploads")[1];
      return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("p", null, "Selfie Image Path"), imageUrl ? /*#__PURE__*/React__default.default.createElement("img", {
        src: imageUrl,
        alt: "Image",
        style: {
          width: "200px",
          borderRadius: "4px"
        }
      }) : /*#__PURE__*/React__default.default.createElement("span", null, "No Image"), /*#__PURE__*/React__default.default.createElement("br", null));
    };

    const ImageComponent$1 = props => {
      const {
        record
      } = props;
      const imageUrl = "/get-image" + record?.params?.frontNationalIdImagePath.split("uploads")[1];
      return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("p", null, "Front National Id Image Path"), imageUrl ? /*#__PURE__*/React__default.default.createElement("img", {
        src: imageUrl,
        alt: "Image",
        style: {
          width: "200px",
          borderRadius: "4px"
        }
      }) : /*#__PURE__*/React__default.default.createElement("span", null, "No Image"));
    };

    const ImageComponent = props => {
      const {
        record
      } = props;
      const imageUrl = "/get-image" + record?.params?.backNationalIdImagePath.split("uploads")[1];
      return /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("p", null, "Back National Id Image Path"), imageUrl ? /*#__PURE__*/React__default.default.createElement("img", {
        src: imageUrl,
        alt: "Image",
        style: {
          width: "200px",
          borderRadius: "4px"
        }
      }) : /*#__PURE__*/React__default.default.createElement("span", null, "No Image"));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.SelfieImageComponent = ImageComponent$2;
    AdminJS.UserComponents.FIDImageComponent = ImageComponent$1;
    AdminJS.UserComponents.BIDImageComponent = ImageComponent;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9TZWxmaWVJbWFnZUNvbXBvbmVudC5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9GSURJbWFnZUNvbXBvbmVudC5qc3giLCIuLi9zcmMvY29tcG9uZW50cy9CSURJbWFnZUNvbXBvbmVudC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBJbWFnZUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xyXG4gICAgY29uc3QgaW1hZ2VVcmwgPVxyXG4gICAgICAgIFwiL2dldC1pbWFnZVwiICsgcmVjb3JkPy5wYXJhbXM/LnNlbGZpZUltYWdlUGF0aC5zcGxpdChcInVwbG9hZHNcIilbMV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8cD5TZWxmaWUgSW1hZ2UgUGF0aDwvcD5cclxuICAgICAgICAgICAge2ltYWdlVXJsID8gKFxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PVwiSW1hZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjIwMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIixcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxzcGFuPk5vIEltYWdlPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUNvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgSW1hZ2VDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuICAgIGNvbnN0IGltYWdlVXJsID1cclxuICAgICAgICBcIi9nZXQtaW1hZ2VcIiArXHJcbiAgICAgICAgcmVjb3JkPy5wYXJhbXM/LmZyb250TmF0aW9uYWxJZEltYWdlUGF0aC5zcGxpdChcInVwbG9hZHNcIilbMV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8cD5Gcm9udCBOYXRpb25hbCBJZCBJbWFnZSBQYXRoPC9wPlxyXG4gICAgICAgICAgICB7aW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJJbWFnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMjAwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+Tm8gSW1hZ2U8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IEltYWdlQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBpbWFnZVVybCA9XHJcbiAgICAgICAgXCIvZ2V0LWltYWdlXCIgK1xyXG4gICAgICAgIHJlY29yZD8ucGFyYW1zPy5iYWNrTmF0aW9uYWxJZEltYWdlUGF0aC5zcGxpdChcInVwbG9hZHNcIilbMV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8cD5CYWNrIE5hdGlvbmFsIElkIEltYWdlIFBhdGg8L3A+XHJcbiAgICAgICAgICAgIHtpbWFnZVVybCA/IChcclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIkltYWdlXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIyMDBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5ObyBJbWFnZTwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUNvbXBvbmVudDtcclxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgU2VsZmllSW1hZ2VDb21wb25lbnQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2VsZmllSW1hZ2VDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNlbGZpZUltYWdlQ29tcG9uZW50ID0gU2VsZmllSW1hZ2VDb21wb25lbnRcbmltcG9ydCBGSURJbWFnZUNvbXBvbmVudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9GSURJbWFnZUNvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRklESW1hZ2VDb21wb25lbnQgPSBGSURJbWFnZUNvbXBvbmVudFxuaW1wb3J0IEJJREltYWdlQ29tcG9uZW50IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0JJREltYWdlQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5CSURJbWFnZUNvbXBvbmVudCA9IEJJREltYWdlQ29tcG9uZW50Il0sIm5hbWVzIjpbIkltYWdlQ29tcG9uZW50IiwicHJvcHMiLCJyZWNvcmQiLCJpbWFnZVVybCIsInBhcmFtcyIsInNlbGZpZUltYWdlUGF0aCIsInNwbGl0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiYWx0Iiwic3R5bGUiLCJ3aWR0aCIsImJvcmRlclJhZGl1cyIsImZyb250TmF0aW9uYWxJZEltYWdlUGF0aCIsImJhY2tOYXRpb25hbElkSW1hZ2VQYXRoIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiU2VsZmllSW1hZ2VDb21wb25lbnQiLCJGSURJbWFnZUNvbXBvbmVudCIsIkJJREltYWdlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBRUEsTUFBTUEsZ0JBQWMsR0FBSUMsS0FBSyxJQUFLO01BQzlCLE1BQU07SUFBRUMsSUFBQUE7SUFBTyxHQUFDLEdBQUdELEtBQUs7SUFDeEIsRUFBQSxNQUFNRSxRQUFRLEdBQ1YsWUFBWSxHQUFHRCxNQUFNLEVBQUVFLE1BQU0sRUFBRUMsZUFBZSxDQUFDQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLEVBQUEsb0JBQ0lDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxlQUNJRCxzQkFBQSxDQUFBQyxhQUFBLENBQUcsR0FBQSxFQUFBLElBQUEsRUFBQSxtQkFBb0IsQ0FBQyxFQUN2QkwsUUFBUSxn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
