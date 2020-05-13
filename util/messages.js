const moment =require('moment');

function FormatMessage(user, message)
{
        var time = moment().format('h:mm a');
    return {
        user,
        message,
        time
    };

}

module.exports = FormatMessage;