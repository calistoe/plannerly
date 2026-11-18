import { Redirect } from 'expo-router';

// Day 2 will send logged-out users to Login instead.
export default function Index() {
  return <Redirect href="/trips" />;
}
