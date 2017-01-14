(function ($) {
    $("form.newsletter_request").submit((evt) => {
        function clearInputs () {
            $('#email').val('')
        }

        console.log('Submitting newsletter request')

        evt.preventDefault()

        var state = $('#email').val()

        if (!state) {
            $('#notsentmessage').show()
            $('#errormessage').hide()
            $('#sendmessage').hide()

            $.scrollTo($('#scroll-after-post'))

            return;
        }

        $.ajax({
            url: 'newsletter',
            dataType: 'json',
            type: 'POST',
            data: $("form.newsletter_request").serialize(),
            success: function (data) {
                $('#notsentmessage').hide()
                $('#errormessage').hide()
                $('#sendmessage').show()

                clearInputs()

                $.scrollTo($('#scroll-after-post'))
            },
            error: function (err) {
                $('#notsentmessage').hide()
                $('#errormessage').show()
                $('#sendmessage').hide()

                clearInputs()

                $.scrollTo($('#scroll-after-post'))
            }
        })

        return false
    })

    $("form.contact_form").submit((evt) => {
        function clearInputs () {
            $('#name').val('')
            $('#email').val('')
            $('#message').val('')
            $('#subject').val('')
        }

        console.log('Submitting contact form')

        evt.preventDefault()

        var state = $('#name').val() && $('#email').val() && $('#message').val() && $('#subject').val()

        if (!state) {
            $('#notsentmessage').show()
            $('#errormessage').hide()
            $('#sendmessage').hide()

            $.scrollTo($('#scroll-after-post'))

            return;
        }

        $.ajax({
            url: 'contact',
            dataType: 'json',
            type: 'POST',
            data: $("form.contact_form").serialize(),
            success: function (data) {
                $('#notsentmessage').hide()
                $('#errormessage').hide()
                $('#sendmessage').show()

                clearInputs()

                $.scrollTo($('#scroll-after-post'))
            },
            error: function (err) {
                $('#notsentmessage').hide()
                $('#errormessage').show()
                $('#sendmessage').hide()

                clearInputs()

                $.scrollTo($('#scroll-after-post'))
            }
        })

        return false
    })
})(jQuery);
