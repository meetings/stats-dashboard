#!/usr/bin/env nodejs

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers")
var pool = require("./pool").pool;

var handle = {}

handle["/pool"] = pool;
handle["/repeat_users"] = requestHandlers.repeat_users;
handle["/registered_within_three"] = requestHandlers.registered_within_three;
handle["/reg_organizers"] = requestHandlers.reg_organizers;
handle["/real_user_registrations"] = requestHandlers.real_user_registrations;
handle["/percent_of_new_real_meeting"] = requestHandlers.percent_of_new_real_meeting;
handle["/new_registered_users_each_month"] =requestHandlers.new_registered_users_each_month;
handle["/monthly_sent_invitations"] = requestHandlers.monthly_sent_invitations;
handle["/monthly_organizers_of_real_meetings"] =requestHandlers.monthly_organizers_of_real_meetings;
handle["/monthly_new_organizers_by_channel"] = requestHandlers.monthly_new_organizers_by_channel;
handle["/meetings_created_cum"] = requestHandlers.meetings_created_cum;
server.start(router.route, handle);
