(function(angular) {
    "use strict";
    function WistiaController($scope, $element, $attrs) {
        $("#upload_button").on("click", function() {
            $("#fileupload").trigger("click");
        });
        $(".fa-cloud-upload").on("click", function() {
            $("#fileupload").trigger("click");
        });
        $(".upload-another-button").on("click", function() {
            // Change displays and initiate a new upload.
            $(".select-display").show();
            $(".upload-display").hide();
            $("#fileupload").trigger("click");
            $("#wistia").attr("src", "about:blank");
        });
        $("#fileupload").fileupload({
            url: "https://upload.wistia.com",
            type: "POST",
            dataType: "json",
            autoUpload: false,
            formData: {
                api_password: $attrs.apiPassword
            },
            done: function (e, data) {
                // Display video, remove progress bar and enable uploading another video.
                $("#wistia").attr("src", "https://fast.wistia.net/embed/iframe/" + data.result.hashed_id + "?videoFoam=true");
                $(".wistia-container").show();
                $(".progress-bar").hide();
                $(".wistia-progress").hide();
                $(".upload-another-button").show();
            }
        }).on("fileuploadadd", function (e, data) {
            data.submit();
            // Reset upload display
            $(".alert").hide();
            $(".wistia-container").hide();
            $(".progress-bar").css("width", "0%");
            $(".wistia-progress").show();
            $(".upload-another-button").hide();
            // Change displays
            $(".select-display").hide();
            $(".upload-display").show();
        }).on("fileuploadprogressall", function (e, data) {
            // Updates progress bar
            var current_progress = parseInt(100 * data.loaded / data.total, 10);
            $(".progress-bar").attr("aria-valuenow", current_progress);
            $(".progress-bar").css("width", current_progress + "%");
            $(".progress-bar").html(current_progress + "%");
        }).on("fileuploadfail", function (e, data) {
            // Upload failed, display an alart.
            $(".alert").show();
            $(".wistia-container").hide();
            $(".wistia-progress").hide();
            $(".upload-another-button").show();
        });
    };

    angular.module("wistiaApp").component("wistiaUploader", {
        templateUrl: "views/wistia-uploader.html",
        controller: WistiaController
    });
})(window.angular);