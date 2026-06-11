// ===== FIFA World Cup 2026 Data =====
// All times stored in UTC, displayed in IST (UTC+5:30)

const FLAGS = {
    "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czechia":"🇨🇿",
    "Canada":"🇨🇦","Bosnia & Herzegovina":"🇧🇦","Qatar":"🇶🇦","Switzerland":"🇨🇭",
    "Brazil":"🇧🇷","Morocco":"🇲🇦","Haiti":"🇭🇹","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "USA":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Türkiye":"🇹🇷",
    "Germany":"🇩🇪","Curaçao":"🇨🇼","Ivory Coast":"🇨🇮","Ecuador":"🇪🇨",
    "Netherlands":"🇳🇱","Japan":"🇯🇵","Sweden":"🇸🇪","Tunisia":"🇹🇳",
    "Belgium":"🇧🇪","Egypt":"🇪🇬","Iran":"🇮🇷","New Zealand":"🇳🇿",
    "Spain":"🇪🇸","Cape Verde":"🇨🇻","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
    "France":"🇫🇷","Senegal":"🇸🇳","Iraq":"🇮🇶","Norway":"🇳🇴",
    "Argentina":"🇦🇷","Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴",
    "Portugal":"🇵🇹","DR Congo":"🇨🇩","Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
    "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦"
};

const GROUPS = {
    A: ["Mexico", "South Africa", "South Korea", "Czechia"],
    B: ["Canada", "Bosnia & Herzegovina", "Qatar", "Switzerland"],
    C: ["Brazil", "Morocco", "Haiti", "Scotland"],
    D: ["USA", "Paraguay", "Australia", "Türkiye"],
    E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
    F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
    G: ["Belgium", "Egypt", "Iran", "New Zealand"],
    H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
    I: ["France", "Senegal", "Iraq", "Norway"],
    J: ["Argentina", "Algeria", "Austria", "Jordan"],
    K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
    L: ["England", "Croatia", "Ghana", "Panama"]
};

// UTC times for matches. Displayed in IST by adding 5h30m
const MATCHES = [
    // ===== GROUP A =====
    {id:1, group:"A", home:"Mexico", away:"South Africa", dateUTC:"2026-06-11T19:00:00Z", venue:"Mexico City", stage:"group"},
    {id:2, group:"A", home:"South Korea", away:"Czechia", dateUTC:"2026-06-12T02:00:00Z", venue:"Guadalajara", stage:"group"},
    {id:3, group:"A", home:"Mexico", away:"Czechia", dateUTC:"2026-06-16T19:00:00Z", venue:"Mexico City", stage:"group"},
    {id:4, group:"A", home:"South Africa", away:"South Korea", dateUTC:"2026-06-17T02:00:00Z", venue:"Guadalajara", stage:"group"},
    {id:5, group:"A", home:"Czechia", away:"South Africa", dateUTC:"2026-06-21T19:00:00Z", venue:"Guadalajara", stage:"group"},
    {id:6, group:"A", home:"South Korea", away:"Mexico", dateUTC:"2026-06-21T19:00:00Z", venue:"Mexico City", stage:"group"},
    // ===== GROUP B =====
    {id:7, group:"B", home:"Canada", away:"Bosnia & Herzegovina", dateUTC:"2026-06-11T23:00:00Z", venue:"Toronto", stage:"group"},
    {id:8, group:"B", home:"Qatar", away:"Switzerland", dateUTC:"2026-06-12T19:00:00Z", venue:"Philadelphia", stage:"group"},
    {id:9, group:"B", home:"Canada", away:"Switzerland", dateUTC:"2026-06-16T23:00:00Z", venue:"Toronto", stage:"group"},
    {id:10, group:"B", home:"Bosnia & Herzegovina", away:"Qatar", dateUTC:"2026-06-17T19:00:00Z", venue:"Philadelphia", stage:"group"},
    {id:11, group:"B", home:"Switzerland", away:"Bosnia & Herzegovina", dateUTC:"2026-06-21T23:00:00Z", venue:"Philadelphia", stage:"group"},
    {id:12, group:"B", home:"Qatar", away:"Canada", dateUTC:"2026-06-21T23:00:00Z", venue:"Toronto", stage:"group"},
    // ===== GROUP C =====
    {id:13, group:"C", home:"Brazil", away:"Morocco", dateUTC:"2026-06-12T19:00:00Z", venue:"Dallas", stage:"group"},
    {id:14, group:"C", home:"Haiti", away:"Scotland", dateUTC:"2026-06-12T23:00:00Z", venue:"Miami", stage:"group"},
    {id:15, group:"C", home:"Brazil", away:"Scotland", dateUTC:"2026-06-17T19:00:00Z", venue:"Dallas", stage:"group"},
    {id:16, group:"C", home:"Morocco", away:"Haiti", dateUTC:"2026-06-17T23:00:00Z", venue:"Miami", stage:"group"},
    {id:17, group:"C", home:"Scotland", away:"Morocco", dateUTC:"2026-06-22T19:00:00Z", venue:"Dallas", stage:"group"},
    {id:18, group:"C", home:"Haiti", away:"Brazil", dateUTC:"2026-06-22T19:00:00Z", venue:"Miami", stage:"group"},
    // ===== GROUP D =====
    {id:19, group:"D", home:"USA", away:"Paraguay", dateUTC:"2026-06-13T01:00:00Z", venue:"Los Angeles", stage:"group"},
    {id:20, group:"D", home:"Australia", away:"Türkiye", dateUTC:"2026-06-13T19:00:00Z", venue:"Houston", stage:"group"},
    {id:21, group:"D", home:"USA", away:"Türkiye", dateUTC:"2026-06-18T01:00:00Z", venue:"Los Angeles", stage:"group"},
    {id:22, group:"D", home:"Paraguay", away:"Australia", dateUTC:"2026-06-18T19:00:00Z", venue:"Houston", stage:"group"},
    {id:23, group:"D", home:"Türkiye", away:"Paraguay", dateUTC:"2026-06-22T23:00:00Z", venue:"Houston", stage:"group"},
    {id:24, group:"D", home:"Australia", away:"USA", dateUTC:"2026-06-22T23:00:00Z", venue:"Los Angeles", stage:"group"},
    // ===== GROUP E =====
    {id:25, group:"E", home:"Germany", away:"Curaçao", dateUTC:"2026-06-13T23:00:00Z", venue:"New York/NJ", stage:"group"},
    {id:26, group:"E", home:"Ivory Coast", away:"Ecuador", dateUTC:"2026-06-14T02:00:00Z", venue:"Atlanta", stage:"group"},
    {id:27, group:"E", home:"Germany", away:"Ecuador", dateUTC:"2026-06-18T23:00:00Z", venue:"New York/NJ", stage:"group"},
    {id:28, group:"E", home:"Curaçao", away:"Ivory Coast", dateUTC:"2026-06-19T02:00:00Z", venue:"Atlanta", stage:"group"},
    {id:29, group:"E", home:"Ecuador", away:"Curaçao", dateUTC:"2026-06-23T19:00:00Z", venue:"Atlanta", stage:"group"},
    {id:30, group:"E", home:"Ivory Coast", away:"Germany", dateUTC:"2026-06-23T19:00:00Z", venue:"New York/NJ", stage:"group"},
    // ===== GROUP F =====
    {id:31, group:"F", home:"Netherlands", away:"Japan", dateUTC:"2026-06-14T19:00:00Z", venue:"Dallas", stage:"group"},
    {id:32, group:"F", home:"Sweden", away:"Tunisia", dateUTC:"2026-06-14T23:00:00Z", venue:"Kansas City", stage:"group"},
    {id:33, group:"F", home:"Netherlands", away:"Tunisia", dateUTC:"2026-06-19T19:00:00Z", venue:"Dallas", stage:"group"},
    {id:34, group:"F", home:"Japan", away:"Sweden", dateUTC:"2026-06-19T23:00:00Z", venue:"Kansas City", stage:"group"},
    {id:35, group:"F", home:"Tunisia", away:"Japan", dateUTC:"2026-06-23T23:00:00Z", venue:"Kansas City", stage:"group"},
    {id:36, group:"F", home:"Sweden", away:"Netherlands", dateUTC:"2026-06-23T23:00:00Z", venue:"Dallas", stage:"group"},
    // ===== GROUP G =====
    {id:37, group:"G", home:"Belgium", away:"Egypt", dateUTC:"2026-06-14T19:00:00Z", venue:"Boston", stage:"group"},
    {id:38, group:"G", home:"Iran", away:"New Zealand", dateUTC:"2026-06-15T02:00:00Z", venue:"Seattle", stage:"group"},
    {id:39, group:"G", home:"Belgium", away:"New Zealand", dateUTC:"2026-06-19T19:00:00Z", venue:"Boston", stage:"group"},
    {id:40, group:"G", home:"Egypt", away:"Iran", dateUTC:"2026-06-20T02:00:00Z", venue:"Seattle", stage:"group"},
    {id:41, group:"G", home:"New Zealand", away:"Egypt", dateUTC:"2026-06-24T19:00:00Z", venue:"Seattle", stage:"group"},
    {id:42, group:"G", home:"Iran", away:"Belgium", dateUTC:"2026-06-24T19:00:00Z", venue:"Boston", stage:"group"},
    // ===== GROUP H =====
    {id:43, group:"H", home:"Spain", away:"Cape Verde", dateUTC:"2026-06-15T19:00:00Z", venue:"Miami", stage:"group"},
    {id:44, group:"H", home:"Saudi Arabia", away:"Uruguay", dateUTC:"2026-06-15T23:00:00Z", venue:"Houston", stage:"group"},
    {id:45, group:"H", home:"Spain", away:"Uruguay", dateUTC:"2026-06-20T19:00:00Z", venue:"Miami", stage:"group"},
    {id:46, group:"H", home:"Cape Verde", away:"Saudi Arabia", dateUTC:"2026-06-20T23:00:00Z", venue:"Houston", stage:"group"},
    {id:47, group:"H", home:"Uruguay", away:"Cape Verde", dateUTC:"2026-06-25T19:00:00Z", venue:"Houston", stage:"group"},
    {id:48, group:"H", home:"Saudi Arabia", away:"Spain", dateUTC:"2026-06-25T19:00:00Z", venue:"Miami", stage:"group"},
    // ===== GROUP I =====
    {id:49, group:"I", home:"France", away:"Senegal", dateUTC:"2026-06-16T02:00:00Z", venue:"San Francisco", stage:"group"},
    {id:50, group:"I", home:"Iraq", away:"Norway", dateUTC:"2026-06-16T19:00:00Z", venue:"Vancouver", stage:"group"},
    {id:51, group:"I", home:"France", away:"Norway", dateUTC:"2026-06-21T02:00:00Z", venue:"San Francisco", stage:"group"},
    {id:52, group:"I", home:"Senegal", away:"Iraq", dateUTC:"2026-06-21T19:00:00Z", venue:"Vancouver", stage:"group"},
    {id:53, group:"I", home:"Norway", away:"Senegal", dateUTC:"2026-06-25T23:00:00Z", venue:"Vancouver", stage:"group"},
    {id:54, group:"I", home:"Iraq", away:"France", dateUTC:"2026-06-25T23:00:00Z", venue:"San Francisco", stage:"group"},
    // ===== GROUP J =====
    {id:55, group:"J", home:"Argentina", away:"Algeria", dateUTC:"2026-06-16T23:00:00Z", venue:"Atlanta", stage:"group"},
    {id:56, group:"J", home:"Austria", away:"Jordan", dateUTC:"2026-06-17T02:00:00Z", venue:"Dallas", stage:"group"},
    {id:57, group:"J", home:"Argentina", away:"Jordan", dateUTC:"2026-06-22T02:00:00Z", venue:"Dallas", stage:"group"},
    {id:58, group:"J", home:"Algeria", away:"Austria", dateUTC:"2026-06-22T19:00:00Z", venue:"Atlanta", stage:"group"},
    {id:59, group:"J", home:"Jordan", away:"Algeria", dateUTC:"2026-06-26T19:00:00Z", venue:"Atlanta", stage:"group"},
    {id:60, group:"J", home:"Austria", away:"Argentina", dateUTC:"2026-06-26T19:00:00Z", venue:"Dallas", stage:"group"},
    // ===== GROUP K =====
    {id:61, group:"K", home:"Portugal", away:"DR Congo", dateUTC:"2026-06-17T19:00:00Z", venue:"New York/NJ", stage:"group"},
    {id:62, group:"K", home:"Uzbekistan", away:"Colombia", dateUTC:"2026-06-17T23:00:00Z", venue:"Monterrey", stage:"group"},
    {id:63, group:"K", home:"Portugal", away:"Colombia", dateUTC:"2026-06-22T23:00:00Z", venue:"New York/NJ", stage:"group"},
    {id:64, group:"K", home:"DR Congo", away:"Uzbekistan", dateUTC:"2026-06-23T02:00:00Z", venue:"Monterrey", stage:"group"},
    {id:65, group:"K", home:"Colombia", away:"DR Congo", dateUTC:"2026-06-27T19:00:00Z", venue:"Monterrey", stage:"group"},
    {id:66, group:"K", home:"Uzbekistan", away:"Portugal", dateUTC:"2026-06-27T19:00:00Z", venue:"New York/NJ", stage:"group"},
    // ===== GROUP L =====
    {id:67, group:"L", home:"England", away:"Croatia", dateUTC:"2026-06-17T23:00:00Z", venue:"Dallas", stage:"group"},
    {id:68, group:"L", home:"Ghana", away:"Panama", dateUTC:"2026-06-18T02:00:00Z", venue:"Monterrey", stage:"group"},
    {id:69, group:"L", home:"England", away:"Panama", dateUTC:"2026-06-23T02:00:00Z", venue:"Dallas", stage:"group"},
    {id:70, group:"L", home:"Croatia", away:"Ghana", dateUTC:"2026-06-23T19:00:00Z", venue:"Monterrey", stage:"group"},
    {id:71, group:"L", home:"Panama", away:"Croatia", dateUTC:"2026-06-27T23:00:00Z", venue:"Monterrey", stage:"group"},
    {id:72, group:"L", home:"Ghana", away:"England", dateUTC:"2026-06-27T23:00:00Z", venue:"Dallas", stage:"group"},
    // ===== ROUND OF 32 (June 28 - July 3) =====
    {id:73, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-28T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 1"},
    {id:74, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-28T23:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 2"},
    {id:75, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-29T02:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 3"},
    {id:76, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-29T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 4"},
    {id:77, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-29T23:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 5"},
    {id:78, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-30T02:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 6"},
    {id:79, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-30T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 7"},
    {id:80, group:null, home:"TBD", away:"TBD", dateUTC:"2026-06-30T23:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 8"},
    {id:81, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-01T02:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 9"},
    {id:82, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-01T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 10"},
    {id:83, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-01T23:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 11"},
    {id:84, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-02T02:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 12"},
    {id:85, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-02T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 13"},
    {id:86, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-02T23:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 14"},
    {id:87, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-03T02:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 15"},
    {id:88, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-03T19:00:00Z", venue:"TBD", stage:"round32", label:"R32 Match 16"},
    // ===== ROUND OF 16 (July 4 - July 7) =====
    {id:89, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-04T19:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 1"},
    {id:90, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-04T23:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 2"},
    {id:91, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-05T19:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 3"},
    {id:92, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-05T23:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 4"},
    {id:93, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-06T19:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 5"},
    {id:94, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-06T23:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 6"},
    {id:95, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-07T19:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 7"},
    {id:96, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-07T23:00:00Z", venue:"TBD", stage:"round16", label:"R16 Match 8"},
    // ===== QUARTERFINALS =====
    {id:97, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-09T19:00:00Z", venue:"TBD", stage:"quarter", label:"QF 1"},
    {id:98, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-09T23:00:00Z", venue:"TBD", stage:"quarter", label:"QF 2"},
    {id:99, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-10T19:00:00Z", venue:"TBD", stage:"quarter", label:"QF 3"},
    {id:100, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-10T23:00:00Z", venue:"TBD", stage:"quarter", label:"QF 4"},
    // ===== SEMIFINALS =====
    {id:101, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-14T23:00:00Z", venue:"TBD", stage:"semi", label:"SF 1"},
    {id:102, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-15T23:00:00Z", venue:"TBD", stage:"semi", label:"SF 2"},
    // ===== 3RD PLACE =====
    {id:103, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-18T23:00:00Z", venue:"TBD", stage:"third", label:"3rd Place"},
    // ===== FINAL =====
    {id:104, group:null, home:"TBD", away:"TBD", dateUTC:"2026-07-19T23:00:00Z", venue:"New York/NJ", stage:"final", label:"🏆 Final"}
];
