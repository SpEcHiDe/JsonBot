FROM denoland/deno:2.7.11

WORKDIR /app

COPY . .

EXPOSE 8000

CMD ["task", "serverless"]
