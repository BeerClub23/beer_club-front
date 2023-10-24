import requestIp from 'request-ip'

export default async function myRoute(req,res) {
  const detectedIp = requestIp.getClientIp(req)
  return detectedIp
}