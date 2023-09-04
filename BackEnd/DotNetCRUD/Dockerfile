#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["DotNetCRUD.csproj", "."]
RUN dotnet restore "./DotNetCRUD.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "DotNetCRUD.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotNetCRUD.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ARG FRONTEND_URL
ARG DB_PASSWORD
ENV FRONTEND_URL=${FRONTEND_URL}
ENV DB_PASSWORD=${DB_PASSWORD}
ENTRYPOINT ["dotnet", "DotNetCRUD.dll"]