{{/*
Expand the name of the chart.
*/}}
{{- define "platform-api.name" -}}
{{- .Chart.Name -}}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "platform-api.fullname" -}}
{{- .Release.Name -}}
{{- end }}