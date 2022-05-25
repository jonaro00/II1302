void establishConnection();
void sendTelemetry(float *temphum, float *mq2array);
int mqtt_connected();
void mqtt_loop(); 

PubSubClient mqtt_client;
