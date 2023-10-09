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

#For local development build: docker build -t [image_tag] --build-arg FRONTEND_URL=http://localhost:[client_port] --build-arg DB_PASSWORD=**** .
#For local development run with preset environemt variables as above: docker run -p [server_port]:80 [image_tag]
#For local development run with custom environment variables (** This will override the --build-arg set variable): docker run -p [server_port]:80 -e FRONTEND_URL=http://localhost:[client_port] -e DB_PASSWORD=**** [image_tag]
#Example: [image_tag] = local/dotnetcrud:1.0.1 ; [client_port] = 3000 ; [server_port] = 5000
#You can set one or more env variables appending -e before each, same with --build-args
#**The last . in build command tells docker to look for the dockerfile in the current directory
#Check if build successful by going to http://localhost:[server_port]/health