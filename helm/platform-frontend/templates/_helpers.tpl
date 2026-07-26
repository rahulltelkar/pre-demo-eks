{{/*
Expand the name of the chart.
*/}}
{{- define "platform-frontend.name" -}}
{{- .Chart.Name -}}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "platform-frontend.fullname" -}}
{{- .Release.Name -}}
{{- end }}