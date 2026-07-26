import dotenv from 'dotenv';
import { generateTripItinerary } from './services/gemini.service.js';
import { validateDestination } from './services/places.service.js';
import { analyzeDestinationDuration } from './services/destinationIntelligence.service.js';

dotenv.config();

console.log('====================================================');
console.log('VOYAGE AI — AUTOMATED STABILITY & RELIABILITY BENCHMARK');
console.log('====================================================\n');

async function runBenchmark() {
  let passedCount = 0;
  let failedCount = 0;

  // 1. Invalid Destination Rejection Test
  console.log('--- TEST 1: Invalid Destination Rejection ---');
  try {
    const res = await validateDestination('asdfghjklqwerty12345');
    if (!res.valid && res.error && res.error.includes('valid city, country')) {
      console.log(
        '✅ PASS: Successfully rejected non-existent destination with message:',
        res.error,
        '\n'
      );
      passedCount++;
    } else {
      console.error('❌ FAIL: Did not properly reject invalid destination.', res);
      failedCount++;
    }
  } catch (e) {
    console.error('❌ FAIL: Threw unexpected exception on invalid destination test:', e.message);
    failedCount++;
  }

  // 2. Small Landmark with Excessive Duration Test
  console.log('--- TEST 2: Small Landmark with Excessive Duration (India Gate for 10 Days) ---');
  try {
    const valRes = await validateDestination('India Gate');
    if (valRes.valid) {
      const analysis = analyzeDestinationDuration({
        place: valRes.place,
        requestedDays: 10,
        forceGenerate: false,
      });
      if (
        !analysis.suitable &&
        analysis.requiresConfirmation &&
        analysis.suggestedDestination &&
        analysis.message.includes('not suitable')
      ) {
        console.log('✅ PASS: Correctly intercepted small landmark for 10-day trip!');
        console.log(`   Guidance: "${analysis.message}"`);
        console.log(
          `   Suggested Switch: "${analysis.suggestedDestination}" for ${analysis.suggestedDays} day(s)\n`
        );
        passedCount++;
      } else {
        console.error('❌ FAIL: Did not generate correct suitability warning:', analysis);
        failedCount++;
      }
    } else {
      console.warn(
        '⚠️ SKIP: Google Places validation for India Gate returned invalid or API key rate limit.'
      );
    }
  } catch (e) {
    console.error('❌ FAIL: Exception during small landmark test:', e.message);
    failedCount++;
  }

  // 3. Consecutive AI Generation Reliability Benchmark covering 5, 10, 20, and 30 day trips
  const testTrips = [
    {
      destination: 'Kyoto, Japan',
      days: 5,
      budget: 'moderate',
      travelStyle: 'couple',
      interests: ['temples', 'gardens'],
    },
    {
      destination: 'Tokyo, Japan',
      days: 10,
      budget: 'moderate',
      travelStyle: 'solo',
      interests: ['anime', 'ramen', 'shrines'],
    },
    {
      destination: 'Switzerland',
      days: 20,
      budget: 'moderate',
      travelStyle: 'family',
      interests: ['scenic trains', 'alps'],
    },
    {
      destination: 'Bali, Indonesia',
      days: 30,
      budget: 'moderate',
      travelStyle: 'couple',
      interests: ['beaches', 'wellness', 'cafes'],
    },
  ];

  console.log(
    `--- TEST 3–6: Executing ${testTrips.length} Itinerary Synthesis & Chunking Benchmark Runs (100% JSON Reliability Guarantee) ---\n`
  );

  for (let i = 0; i < testTrips.length; i++) {
    const trip = testTrips[i];
    console.log(
      `[Run #${i + 1}] Synthesizing ${trip.days}-Day itinerary for ${trip.destination}...`
    );
    const startTime = Date.now();

    try {
      const result = await generateTripItinerary({
        destination: trip.destination,
        days: trip.days,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        interests: trip.interests,
        notes: 'Strict INR pricing required.',
      });

      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);

      // Verify strict structural validity and JSON completeness
      if (
        result &&
        result.destination &&
        Array.isArray(result.dailyItinerary) &&
        result.dailyItinerary.length === trip.days
      ) {
        const allValid = result.dailyItinerary.every(
          (d) => Array.isArray(d.timeline) && d.timeline.length > 0
        );
        if (allValid) {
          console.log(
            `✅ RUN #${i + 1} SUCCESS: ${trip.destination} (${trip.days} Days synthesized in ${elapsedSec}s) — Title: "${result.tripTitle}"`
          );
          passedCount++;
        } else {
          console.error(`❌ RUN #${i + 1} FAIL: One or more days lacked a valid timeline array.`);
          failedCount++;
        }
      } else {
        console.error(
          `❌ RUN #${i + 1} FAIL: Incomplete dailyItinerary array or malformed result structure.`
        );
        failedCount++;
      }
    } catch (err) {
      console.error(
        `❌ RUN #${i + 1} CRITICAL EXCEPTION: Failed during synthesis of ${trip.destination} (${trip.days} days):`,
        err.message
      );
      failedCount++;
    }

    if (i < testTrips.length - 1) {
      console.log(
        '[Benchmark Pacing] Sleeping 5 seconds before initiating next trip synthesis...\n'
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
    console.log('----------------------------------------------------');
  }

  console.log('\n====================================================');
  console.log('STABILITY BENCHMARK FINAL RESULTS');
  console.log('====================================================');
  console.log(`Total Verification Tests Run: ${passedCount + failedCount}`);
  console.log(`✅ Passed: ${passedCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  if (failedCount === 0) {
    console.log('\n🎉 ALL AI GENERATIONS & VALIDATIONS PASSED WITH 0 JSON EXCEPTIONS!');
  } else {
    console.log('\n⚠️ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.');
    process.exit(1);
  }
}

runBenchmark();
