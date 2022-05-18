
static void connectToWiFi();
static void initializeTime();
static char* getCurrentLocalTimeString();
static void printCurrentTime();
void receivedCallback(char* topic, byte* payload, unsigned int length);
static void initializeClients();
static uint32_t getSecondsSinceEpoch();
static int generateSasToken(char* sas_token, size_t size);
static int connectToAzureIoTHub();
static void establishConnection();
static char* getTelemetryPayload(float *temphum, float *mq2array);
static void sendTelemetry(float *temphum, float *mq2array);
static int mqtt_connected();
static void mqtt_loop(); 
