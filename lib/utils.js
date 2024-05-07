// Function to generate random coordinates within a given radius (in kilometers) around a center point
export const generateRandomCoordinates = (center, radius) => {
  // Earth's radius in kilometers
  const earthRadius = 6371

  // Convert the radius from kilometers to radians
  const radiusInRadians = radius / earthRadius

  // Generate a random distance within the radius
  const randomDistance = Math.random() * radiusInRadians

  // Generate a random bearing (direction) in radians
  const randomBearing = Math.random() * 2 * Math.PI

  // Calculate the latitude of the new point
  const centerLatRadians = (center.lat * Math.PI) / 180
  const newLatRadians = Math.asin(
    Math.sin(centerLatRadians) * Math.cos(randomDistance) +
      Math.cos(centerLatRadians) *
        Math.sin(randomDistance) *
        Math.cos(randomBearing)
  )
  const newLat = (newLatRadians * 180) / Math.PI

  // Calculate the longitude of the new point
  const centerLngRadians = (center.lng * Math.PI) / 180
  const newLngRadians =
    centerLngRadians +
    Math.atan2(
      Math.sin(randomBearing) *
        Math.sin(randomDistance) *
        Math.cos(centerLatRadians),
      Math.cos(randomDistance) -
        Math.sin(centerLatRadians) * Math.sin(newLatRadians)
    )
  const newLng = (newLngRadians * 180) / Math.PI

  // Return the new coordinates
  return { lat: newLat, lng: newLng }
}
