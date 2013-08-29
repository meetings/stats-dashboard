#!/usr/bin/env nodejs

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var requestHandlersWeekly = require("./requestHandlersWeekly");

var handle = {}

handle["/pool"] = require("./pool").pool;

handle["/repeat_users"] = requestHandlers.repeat_users;
handle["/registered_within_three"] = requestHandlers.registered_within_three;
handle["/reg_organizers"] = requestHandlers.reg_organizers;
handle["/real_user_registrations"] = requestHandlers.real_user_registrations;
handle["/percent_of_new_real_meeting"] = requestHandlers.percent_of_new_real_meeting;
handle["/new_registered_users_each_month"] = requestHandlers.new_registered_users_each_month;
handle["/monthly_sent_invitations"] = requestHandlers.monthly_sent_invitations;
handle["/monthly_organizers_of_real_meetings"] = requestHandlers.monthly_organizers_of_real_meetings;
handle["/monthly_new_organizers_by_channel"] = requestHandlers.monthly_new_organizers_by_channel;
handle["/meetings_created_cum"] = requestHandlers.meetings_created_cum;

handle["/weekly_repeat_users"] = requestHandlersWeekly.repeat_users;
handle["/weekly_registered_within_three"] = requestHandlersWeekly.registered_within_three;
handle["/weekly_reg_organizers"] = requestHandlersWeekly.reg_organizers;
handle["/weekly_real_user_registrations"] = requestHandlersWeekly.real_user_registrations;
handle["/weekly_percent_of_new_real_meeting"] = requestHandlersWeekly.percent_of_new_real_meeting;
handle["/weekly_new_registered_users_each_month"] = requestHandlersWeekly.new_registered_users_each_month;
handle["/weekly_sent_invitations"] = requestHandlersWeekly.weekly_sent_invitations;
handle["/weekly_organizers_of_real_meetings"] = requestHandlersWeekly.weekly_organizers_of_real_meetings;
handle["/weekly_new_organizers_by_channel"] = requestHandlersWeekly.weekly_new_organizers_by_channel;
handle["/weekly_meetings_created_cum"] = requestHandlersWeekly.meetings_created_cum;

server.start(router.route, handle);
