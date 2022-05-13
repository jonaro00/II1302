// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT

// Wifi
#define IOT_CONFIG_WIFI_SSID "BashariPhone"
#define IOT_CONFIG_WIFI_PASSWORD "wifiwifiwifi1997"

// Azure IoT
#define IOT_CONFIG_IOTHUB_FQDN "spafemonitor-iot.azure-devices.net"
#define IOT_CONFIG_DEVICE_ID "sensor1"
#define IOT_CONFIG_DEVICE_KEY "4s+oFZEcFAHwNY4H8vZCdnI7zOIbOjTaHkpFsR2LB5E="

// Publish 1 message every 2 seconds
#define TELEMETRY_FREQUENCY_MILLISECS 2000 


// Memory allocated for the sample's variables and structures.
static WiFiClientSecure wifi_client;
static X509List cert((const char*)ca_pem);
static PubSubClient mqtt_client(wifi_client);
static az_iot_hub_client client;
static char sas_token[200];
static uint8_t signature[512];
static unsigned char encrypted_signature[32];
static char base64_decoded_device_key[32];
static unsigned long next_telemetry_send_time_ms = 0;
static char telemetry_topic[128];
static uint8_t telemetry_payload[100];
static uint32_t telemetry_send_count = 0;

// When developing for your own Arduino-based platform,
// please follow the format '(ard;<platform>)'. 
#define AZURE_SDK_CLIENT_USER_AGENT "c/" AZ_SDK_VERSION_STRING "(ard;esp8266)"

// Utility macros and defines
#define LED_BUILTIN 2
#define sizeofarray(a) (sizeof(a) / sizeof(a[0]))
#define ONE_HOUR_IN_SECS 3600
#define NTP_SERVERS "pool.ntp.org", "time.nist.gov"
#define MQTT_PACKET_SIZE 1024
