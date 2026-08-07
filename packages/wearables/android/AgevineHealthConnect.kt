package com.agevine.wearables

import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.HeartRateRecord
import androidx.health.connect.client.records.StepsRecord
import android.content.Context
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.delay
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import java.time.Instant
import java.time.temporal.ChronoUnit

class AgevineHealthConnect(private val context: Context) {
    
    private val healthConnectClient by lazy { HealthConnectClient.getOrCreate(context) }
    private var isConnected = false

    val permissions = setOf(
        HealthPermission.getReadPermission(HeartRateRecord::class),
        HealthPermission.getReadPermission(StepsRecord::class)
    )

    fun checkPermissions(granted: Boolean) {
        isConnected = granted
    }

    /**
     * Simulates streaming live heart rate data over a persistent connection.
     * In a real Android Wear OS app, this would tie into a WebSocket client.
     */
    fun startVitalsStream(endpoint: String): Flow<HeartRateRecord> = flow {
        if (!isConnected) {
            throw SecurityException("Health Connect permissions not granted.")
        }
        
        println("[AgevineHealthConnect] Started native WebSocket streaming to $endpoint")
        
        while(true) {
            val endTime = Instant.now()
            val startTime = endTime.minus(5, ChronoUnit.MINUTES)
            
            val request = ReadRecordsRequest(
                recordType = HeartRateRecord::class,
                timeRangeFilter = TimeRangeFilter.between(startTime, endTime)
            )
            
            val response = healthConnectClient.readRecords(request)
            for (record in response.records) {
                // In a production app, we would push this over a WebSocket here.
                // For now, we emit the raw record to the React Native bridge.
                emit(record)
            }
            
            delay(10000) // Poll every 10 seconds
        }
    }
}
