#!/bin/sh

NODE_ENV=production
DAEMON="node www"
NAME=Contacts
DESC=Contacts
PIDFILE="Contacts.pid"
CATALINA_OUT=catalina.out

touch $CATALINA_OUT
case "$1" in
	start)
		echo "Starting $DESC:"
				nohup $DAEMON >> $CATALINA_OUT 2>&1 &
		echo $! > $PIDFILE
		echo "$NAME."
				;;
	stop)
		echo "Stopping $DESC:"
				pid='cat $PIDFILE'
		kill $pid
			rm $PIDFILE
		echo "$NAME."
				;;
esac

exit 0