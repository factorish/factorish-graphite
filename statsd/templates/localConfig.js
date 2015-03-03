{{ $graphite_line := split (index (getvs "/services/graphite_line/*") 0) ":" }}
{
  graphiteHost: "{{ index $graphite_line 0 }}",
  graphitePort: {{ index $graphite_line 1 }},
  port: 8125
}
