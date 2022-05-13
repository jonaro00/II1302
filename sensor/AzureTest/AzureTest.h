
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
static char* getTelemetryPayload();
static void sendTelemetry();
//static unsigned long next_telemetry_send_time_ms;
static int mqtt_connected();
static void mqtt_loop(); 
