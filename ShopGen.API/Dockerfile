FROM ubuntu:22.04 AS builder
RUN apt-get update && apt-get install -y dotnet6 ca-certificates
WORKDIR /source
COPY . .
RUN dotnet publish -c Release -o /app --self-contained false

FROM ubuntu.azurecr.io/dotnet-aspnet:6.0-22.10_edge
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT [ "dotnet", "ShopGen.API.dll" ]