/**
 * Reads a request body up to a byte limit, aborting the stream as soon as
 * the limit is crossed instead of buffering the whole payload first (which
 * is what `request.json()` does — it fully reads and parses before any
 * size check can run).
 */
export class PayloadTooLargeError extends Error {}

export async function readBodyWithLimit(request: Request, maxBytes: number): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let received = 0;
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel();
      throw new PayloadTooLargeError(`Request body exceeds ${maxBytes} bytes`);
    }

    result += decoder.decode(value, { stream: true });
  }

  result += decoder.decode();
  return result;
}
